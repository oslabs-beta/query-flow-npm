import CryptoJS from "crypto-js";

const QueryFlow = {};

QueryFlow.autoCache = async (redisModel, db, querystring, values, threshold, TTL) => {

  //Check querystring is 'Read' Type. If not, throw new error. 
  const stringCheck = async () => {
    if(!querystring.toLowerCase().startsWith('select')){ 
      console.error('Query string must be of read type only. I.E. SELECT');
      const string = {text: querystring, values: values};
      const result = await db(string);
      return result;
    }
  };
  stringCheck(querystring);

  //querystring is passed in as a string. Values for the queryString are passed in as an array. These parameters are stored in the string object, which is later passed into the db model
  const string = {text: querystring, values: values};
 
  //Creating a unique string for hashing, creating a unique key for redis storage
  let keyConcat = '';
  for (let i = 0; i < values.length; i++){
    keyConcat += values[i].toString()
  } 
  keyConcat = keyConcat + querystring

  //Create the hash key for the data to be stored. 
  const hash = CryptoJS.MD5(keyConcat).toString();

  //Attempt to retrieve data from User's redis instance.
  const getResultRedis = await redisModel.json.get(hash, {
    path: '.',
  });
    
  //CACHE HIT
  if (getResultRedis){
    console.log(`Returned data associated with key ${hash} from Redis`)
    return getResultRedis;
    
  //CACHE MISS
  } else {
    const startTime = process.hrtime();
    const resultSQL = await db(string);
    const endTime = process.hrtime(startTime);
    const totalTimeSQL = (endTime[0] * 1000 + endTime[1] / 1000000).toFixed(2);
    if (totalTimeSQL > threshold){
      try {
        console.log(`Set Redis with key ${hash} and data`);
        await redisModel.json.set(hash, '.', resultSQL);
        await redisModel.expire(hash, TTL);
      } catch (err) {
        console.error('Error setting JSON data in Redis Database:', err);
        return resultSQL;
      } 
    }
    return resultSQL;
  }
};

QueryFlow.explain = () => {
  console.log(
    'How to set Parameters', '\n','redisModel: Redis client to be set as \'redisModel\' or imported as \'redisModel\'','\n','db: Database client to be set as \'db\' or imported as \'db\'','\n','querystring: User to pass in variable with the value of the relevant query string', '\n', 'values: User to pass in an array of values to be used to query the primary database','\n','threshold: User to set threshold in milliseconds', '\n', 'TTL: User to set TTL in SECONDS', '\n','We recommend using volatile-ttl with this package, however, this is a recommendation only','\n', 'That\'s it! We hope you enjoy using QueryFlow!','\n','Please visit https://www.query-flow.com for more information'
  );
};

export default QueryFlow;