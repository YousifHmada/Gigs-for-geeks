async function ensureAuth(req) {
  const [token] = req.headers.authorization.split('BearerToken ');
  return req.context.useCases.verifyToken(token);
}

async function findJobs(req, res, next) {
  try {
    await ensureAuth(req);
    const page = req.query.page ? +req.query.page : 1;
    // eslint-disable-next-line no-restricted-globals
    if (typeof page !== 'number' || isNaN(page)) {
      throw new req.context.entities.CustomError('Invalid page!');
    }
    const results = await req.context.useCases.findJobs(page);
    const total = await req.context.useCases.countJobs();
    const host = req.context.env.host || 'http://localhost';
    const port = req.context.env.port || 3000;
    const cursor = `${host}${req.context.env.NODE_ENV === 'development' ? `:${port}` : ''}/api/jobs?page=${page + 1}`;
    res.send({
      page,
      total,
      results,
      cursor,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteJob(req, res, next) {
  try {
    await ensureAuth(req);
    const id = req.params.id ? +req.params.id : undefined;
    // eslint-disable-next-line no-restricted-globals
    if (typeof id !== 'number' || isNaN(id)) {
      throw new req.context.entities.CustomError('Invalid id!');
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
