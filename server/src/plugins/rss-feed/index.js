const Parser = require('rss-parser');

const parser = new Parser();

async function readRSSFeed(url, lastIsoDate) {
  const feed = await parser.parseURL(url);

  const jobs = feed.items.map((job) => ({
    title: job.title,
    link: job.link,
    content: job.content,
    isoDate: new Date(job.isoDate),
  }));

  return lastIsoDate ? jobs.filter(({ isoDate }) => isoDate > lastIsoDate) : jobs;
}

function init(context) {
  const interval = context.config.RSS_INTERVAL * 60 * 1000;
  const intervalObj = setInterval(async () => {
    const lastIsoDate = await context.plugins.postgres.getLastIsoDate();
    const jobs = await readRSSFeed(context.config.RSS_URL, lastIsoDate);
    try {
      await Promise.all(jobs.map(context.useCases.addJob));
      // eslint-disable-next-line no-console
      console.log(`[RSS FEED] ${jobs.length} jobs added!`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('[RSS FEED] error in saving jobs!');
    }
  }, interval);
  function close() {
    clearInterval(intervalObj);
  }
  return {
    close,
  };
}

module.exports = init;
