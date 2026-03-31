
const { Worker } = require("bullmq");
const IORedis = require("ioredis");
const Parser = require("rss-parser");
const crypto = require("crypto");

const Agent = require("../models/agent.model");
const Article = require("../models/article.model");

const parser = new Parser();

const connection = new IORedis({
    host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
})

const worker = new Worker(
  "rssQueue",
  async job => {
    if (job.name === "fetchRSS") {

      console.log("Fetching RSS...");

      const agents = await Agent.find();
      console.log(agents, "ag");

      for (let agent of agents) {
        try {
          const feed = await parser.parseURL(agent.rssUrl);

          for (let item of feed.items) {
            const hash = crypto.createHash("md5").update(item.link).digest("hex");

            const exists = await Article.findOne({ uniqueHash: hash });

            if (!exists) {
              await Article.create({
                title: item.title,
                description: item.contentSnippet,
                link: item.link,
                pubDate: item.pubDate,
                category: agent.category,
                sourceAgent: agent._id,
                uniqueHash: hash
              });
            }
          }
        } catch (err) {
          console.log("Error:", agent.name);
        }
      }

    }
  },
  { connection }
);