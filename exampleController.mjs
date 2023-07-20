import db from "../models/ourDBModel.mjs";
import redisModel from "../models/redisModel.mjs";
import QueryFlow from "queryflow.js";

const exampleController = {};

exampleController.example = async (req, res, next) => {
  const queryString = "SELECT * FROM users WHERE firstname = $1 AND lastname = $2";
  const { firstName, lastName } = req.body;
  const values = [firstName, lastName];
  const threshold = 3000; //Milliseconds
  const TTL = 30; //Seconds
  try {
    const result = await QueryFlow.autoCache({
      redisModel,
      db,
      queryString,
      values,
      threshold, //OPTIONAL: Default value 3 seconds.
      TTL, //OPTIONAL: Default value 30 minutes.
      log:true, //OPTIONAL: Default value false. Turn console logs on and off.
      instanceLatency:true //OPTIONAL: Default value false. Switches measurement of time from measuring total latency to measuring total time within the primary database itself. 
  });
    res.locals.data = result.rows;
    return next();
  } catch (error) {
    return next({
      log: "Error handler caught error in middleware",
      status: 500,
      message: "Error handler caught error in middleware",
    });
  }
};

export default exampleController;