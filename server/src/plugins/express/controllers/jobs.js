async function findJobs(req, res, next) {
  try {
    const page = req.query.page ? +req.query.page : 1;
    const results = await req.context.useCases.findJobs(page);
    const total = await req.context.useCases.countJobs();
    res.send({
      page,
      total,
      results,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteJob(req, res, next) {
  try {
    const id = req.params.id ? +req.query.id : undefined;
    if (typeof id !== 'number') {
      throw new req.context.entities.CustomError('Id is required!');
    }
    await req.context.useCases.deleteJob(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  findJobs,
  deleteJob,
};
