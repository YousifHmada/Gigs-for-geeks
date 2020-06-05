/* eslint-disable no-plusplus */
let lastId = 0;

function readRSSFeed() {
  return [
    { title: `Sample job ${lastId++}` },
    { title: `Sample job ${lastId++}` },
    { title: `Sample job ${lastId++}` },
    { title: `Sample job ${lastId++}` },
    { title: `Sample job ${lastId++}` },
    { title: `Sample job ${lastId++}` },
    { title: `Sample job ${lastId++}` },
    { title: `Sample job ${lastId++}` },
    { title: `Sample job ${lastId++}` },
  ];
}

function init(context) {
  const interval = context.config.RSS_INTERVAL * 1000;
  const intervalObj = setInterval(async () => {
    const jobs = await readRSSFeed();
    jobs.forEach(context.useCases.addJob);
    // eslint-disable-next-line no-console
    console.log(`[RSS FEED] ${jobs.length} jobs added!`);
  }, interval);
  function close() {
    clearInterval(intervalObj);
  }
  return {
    close,
  };
}

module.exports = init;
