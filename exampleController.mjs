import db from '../models/ourDBModel.mjs';
import redisModel from '../models/redisModel.mjs';
import QueryFlow from '@query-flow/query-flow';

const exampleController = {};

exampleController.example = async (req, res, next) => {

  const querystring = 'SELECT * FROM users WHERE firstname = $1 AND lastname = $2';
  const { firstname, lastname } = req.body;
  const values = [firstname, lastname];
  const threshold = 3000; //Milliseconds
  const TTL = 30; //Seconds
  try {
    const result = await QueryFlow.autoCache(redisModel, db, querystring, values, threshold, TTL);
    res.locals.data = result.rows;
    return next();
  } catch (error) {
    return next({
      log: 'Error handler caught error in middleware',
      status: 500,
      message: 'Error handler caught error in middleware'
    });
  };
};

export default exampleController;