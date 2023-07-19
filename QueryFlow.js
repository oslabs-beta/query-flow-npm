import CryptoJS from "crypto-js";

const QueryFlow = {};

QueryFlow.autoCache = async ({redisModel, db, queryString, values, threshold = 3000, TTL = 1800, log = false}) => {
  
  //Check querystring is 'Read' Type. If not, throw new error. 
  const stringCheck = async () => {
    if(!queryString.toLowerCase().startsWith('select')){ 
      console.error('Query string must be of read type only. I.E. SELECT');
      const string = {text: queryString, values: values};
      const result = await db(string);
      return result;
    }
  };
  stringCheck(queryString);

  const string = {text: queryString, values: values};
 
  //Create a unique key for redis storage
  let keyConcat = '';
  for (let i = 0; i < values.length; i++){
    keyConcat += values[i].toString()
  } 
  keyConcat = keyConcat + queryString

  //Create the hash key for the data to be stored. 
  const hash = CryptoJS.MD5(keyConcat).toString();

  //Attempt to retrieve data from Redis instance.
  const getResultRedis = await redisModel.json.get(hash, {
    path: '.',
  });
    
  //CACHE HIT
  if (getResultRedis){
    if (log) console.log(`Returned data associated with key ${hash} from Redis`)
    return getResultRedis;

  //CACHE MISS
  } else {
    const startTime = process.hrtime();
    const resultSQL = await db(string);
    const endTime = process.hrtime(startTime);
    const totalTimeSQL = (endTime[0] * 1000 + endTime[1] / 1000000).toFixed(2);
    if (totalTimeSQL > threshold) {
      const addToCache = async () => {
        try {
          if (log)console.log(`Set Redis with key ${hash} and data`);
          await redisModel.json.set(hash, '.', resultSQL);
          await redisModel.expire(hash, TTL);
        } catch (err) {
          console.error('Error setting JSON data in Redis Database:', err);
        }
      }
      addToCache();
    }
    return resultSQL;
  }
};

export default QueryFlow;