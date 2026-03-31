
const { Queue } = require("bullmq");
const IORedis = require("ioredis");

const connection = new IORedis();

const rssQueue = new Queue("rssQueue", { connection });

module.exports = rssQueue;