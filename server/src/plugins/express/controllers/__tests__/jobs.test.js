/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { deleteJob } = require('../jobs');

let req;
let res;
let nex;

beforeEach(() => {
  req = {
    params: {},
    headers: {},
    context: {
      entities: {
        CustomError: jest.fn(),
      },
      useCases: {
        deleteJob: jest.fn(),
        verifyToken: jest.fn(),
      },
    },
  };
  res = {
    status: jest.fn(),
    send: jest.fn(),
  };
  next = jest.fn();
});

describe('[DELETE /jobs/:id]', () => {
  describe('should throw 401 error when req is not authorized', () => {
    test('example with empty authorization header', async () => {
      req.headers.authorization = null;
      req.context.entities.CustomError.mockReturnValueOnce();
      await deleteJob(req, res, next);
      expect(req.context.entities.CustomError).toHaveBeenCalledWith(
        401,
        'invalid token',
      );
      expect(next).toHaveBeenCalledWith(expect.any(req.context.entities.CustomError));
    });
    test('example with invalid bearer token', async () => {
      const token = 'BearerToken kljasfkjl12kljklaf';
      req.headers.authorization = token;
      req.context.useCases.verifyToken.mockRejectedValueOnce();
      await deleteJob(req, res, next);
      expect(next).toHaveBeenCalled();
      expect(req.context.useCases.verifyToken).toHaveBeenCalledWith(
        'kljasfkjl12kljklaf',
      );
    });
  });
  test('should call deleteJob useCase with jobId', async () => {
    req.params.id = 120;
    const token = 'BearerToken kljasfkjl12kljklaf';
    req.headers.authorization = token;
    req.context.useCases.deleteJob.mockResolvedValueOnce();
    await deleteJob(req, res, next);
    expect(req.context.useCases.deleteJob).toHaveBeenCalledWith(120);
  });
  test('should propagate errors', async () => {
    const err = new Error();
    req.params.id = 120;
    const token = 'BearerToken kljasfkjl12kljklaf';
    req.headers.authorization = token;
    req.context.useCases.deleteJob.mockRejectedValueOnce(err);
    await deleteJob(req, res, next);
    expect(next).toHaveBeenCalledWith(err);
  });
  test('should send 204 on succeed', async () => {
    req.params.id = 120;
    const token = 'BearerToken kljasfkjl12kljklaf';
    req.headers.authorization = token;
    req.context.useCases.deleteJob.mockResolvedValueOnce();
    res.status.mockReturnValueOnce(res);
    await deleteJob(req, res, next);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});
