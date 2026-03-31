const rssQueue = require("./rss.queue");

(async () => {
  await rssQueue.add(
    "fetchRSS",
    {},
    {
      repeat: {
        cron: "*/10 * * * *"
      }
    }
  );
})();