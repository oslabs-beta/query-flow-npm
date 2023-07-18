# query-flow

NPM package for automatically caching slow SQL queries

How to set Parameters,
RedisModel: Redis client to be set as 'redisModel' or imported as 'redisModel'.
db: Database client to be set as 'db' or imported as 'db'.
querystring: User to pass in variable with the value of the relevant query string.
values: User to pass in an array of values to be used to query the primary database.
threshold: User to set threshold in milliseconds.
TTL: User to set TTL in SECONDS.

We recommend using volatile-ttl with this package, however, this is a recommendation only.

Usage

Here's a basic usage example:

const QueryFlow = require('query-flow-npm');

// your code to initialize db and redisModel here

QueryFlow.autoCache(redisModel, db, 'SELECT \* FROM my_table WHERE id = $1', [1], 1000, 60);

That's it! We hope you enjoy using QueryFlow!

Please visit https://www.query-flow.com for more information.
