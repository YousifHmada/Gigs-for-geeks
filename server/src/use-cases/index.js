const initFindJobs = require('./findJobs');
const initCountJobs = require('./countJobs');
const initDeleteJob = require('./deleteJob');
const initAddJob = require('./addJob');

function init(context) {
  const useCases = {
    findJobs: initFindJobs(context),
    countJobs: initCountJobs(context),
    deleteJob: initDeleteJob(context),
    addJob: initAddJob(context),
  };
  Object.keys(useCases).forEach((key) => {
    // eslint-disable-next-line no-param-reassign
    context.useCases[key] = useCases[key];
  });
}

module.exports = init;
