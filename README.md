# queryflow.js

<!-- PROJECT LOGO -->
<br />
<a id="readme-top"></a>
<div align="center">
  <a href="https://www.query-flow.com">
    <img src="./assets/QueryFlow-logo-white.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">queryflow.js</h3>

  <p align="center">
    Lightweight middleware function that automatically caches SQL query results for increased performance.
    <br />
    <br />
    <!--Do we need explore the docs? The README is basically the documentation.-->
    <a href="https://www.query-flow.com"><strong>Analyze & Visualize »</strong></a>
    <br />
    <br />
    <a href="https://github.com/oslabs-beta/query-flow-npm/issues">Report Bug</a>
    ·
    <a href="https://github.com/oslabs-beta/query-flow-npm/issues">Request Feature</a>
  </p>
</div>

</br>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<div align="center">
  <a href="https://www.query-flow.com">
    <img src="./assets/QueryFlowTagLogo.png" alt="Logo" width="" height="55">
  </a>
</div>

</br>

Before the development of this NPM package to automatically cache query results from a relational database, a [web application](https://www.query-flow.com) was made for developers to analyze and visualize the performance of SQL queries. With these insights into the performance of an application's backend queries, developers can implement data-backed thresholds with the queryflow.js NPM package, such that queries slower than the set threshold will be stored in a cache database. This **increases performance** of applications by **reducing each query's time** by up to _**94%**_.

[NPM Package](https://www.npmjs.com/package/queryflow.js)

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

This package assumes that a Redis instance has been set up alongside a primary relational database.

For more information about setting up a Redis database, visit [their docs](https://redis.io/docs/getting-started/).

### Installation

To get started:

```sh
npm install queryflow.js
```

<!-- USAGE EXAMPLES -->

## Usage

### Example Implementation in Backend

In the code below, the primary relational database model, Redis model and npm package are imported into a backend controller. Here, the developer defines the SQL query string, an array of values which will be bound to the query string, the threshold time in seconds for caching the results from the primary database, and the TTL of the data stored in the cache database. The autoCache method is invoked asynchronously within the controller function. The results can be assigned, and pass on through the response cycle.

```javascript
import db from "../models/ourDBModel.mjs";
import redisModel from "../models/redisModel.mjs";
import QueryFlow from "queryflow.js";

const exampleController = {};

exampleController.example = async (req, res, next) => {
  const queryString =
    "SELECT * FROM users WHERE firstname = $1 AND lastname = $2";
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
      log: true, //OPTIONAL: Default value false. Turn console logs on and off.
      instanceLatency: true, //OPTIONAL: Default value false. Switches measurement of time from measuring total latency to measuring total time within the primary database itself.
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
```

## Parameters

- []() **redisModel:** Redis client.
- []() **db:** Primary relational database.
- []() **queryString:** SQL query string.
- []() **values:** Array of values to be bound to SQL query string
- []() **threshold:** OPTIONAL. Threshold in milliseconds (ms). Default value is 3 seconds.
- []() **TTL:** OPTIONAL. Time to Live (TTL) in seconds (s). Default value is 30 mins.
- []() **log:** OPTIONAL. Turns console.logs on and off. Default value is false.
- []() **instanceLatency:** OPTIONAL. Switches from measuring total latency to measuring latency within the instance itself. Default value is false.

We recommend using the _volatile-ttl_ eviction policy with this package to take advantage of the data's TTL, in the even that maximum memory is reached.

### Example Use Cases

**Session Storage**

With an automatic cache backend architecture, a session store could be used to cache user session data, thereby improving the speed and efficiency of accessing session data since data is kept in a fast-access cache instead of slower primary storage, such as a relational database. The cache can store frequently accessed session data, which reduces the load on the primary database and improves response times for the user.

**Machine Learning**

Machine learning models can often be quite large and take time to load from a primary database. If an application needs to make frequent predictions in real time, it may be too slow to load the model from disk each time a prediction is needed. This NPM package can be used to cache critical components of the model in memory for fast access, significantly reducing the prediction latency and increasing the overall speed of the application.

**Frequently Fetched Data or Costly Queries**

Storing fetch requests' result sets in memory decreases the processing time for web applications that need to return data from complex queries. Furthermore, data that is frequently used need not be retrieved from a slow primary relational database, it can be kept in memory for quick retrieval as it is often requested by the client.

See the [open issues](https://github.com/oslabs-beta/query-flow-npm/issues) for a full list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- CONTACT -->

## Contact

Email - queryflow58@gmail.com

Twitter - [@Query_Flow](https://twitter.com/Query_Flow)

LinkedIn - [Team Page](https://www.linkedin.com/company/query-flow/about/)

QueryFlow Performance Visualizer and Analyzer: [https://www.query-flow.com/](https://www.query-flow.com/)

## Team

<!-- Include github and linkedin handles and links here? -->

- []() **Vivek Patel** - [GitHub](https://github.com/vkpatel007) - [LinkedIn](https://www.linkedin.com/in/vivekpatel607/)
- []() **Niko Amescua** - [GitHub](https://github.com/NikoAmescua) - [LinkedIn](https://www.linkedin.com/in/nikoamescua/)
- []() **Ryan Campbell** - [GitHub](https://github.com/cronullarc) - [LinkedIn](https://www.linkedin.com/in/ryancampbelladr/)
- []() **Philip Brown** - [GitHub](https://github.com/starfishpanda) - [LinkedIn](https://www.linkedin.com/in/philiplbrown/)
- []() **George Greer** - [GitHub](https://github.com/ggreer91) - [LinkedIn](https://www.linkedin.com/in/george-greer/)

## Acknowledgements

The Team wholeheartedly thanks Chris Suzukida for his mentorship and support throughout the development of this project.

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">Back to Top</a>)</p>
