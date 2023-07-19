# query-flow

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="www.query-flow.com">
    <img src="./assets/QueryFlow-logo-white.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">query-flow</h3>

  <p align="center">
    Lightweight middleware function that automatically caches results of slow SQL queries.
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
  <a href="www.query-flow.com">
    <img src="./assets/QueryFlowTagLogo.png" alt="Logo" width="" height="55">
  </a>
</div>

</br>

Before the development of this NPM package to automatically cache query results from a relational database, a web application, _[www.query-flow.com](www.query-flow.com)_, was made for developers to analyze and visualize the performance of SQL queries. With these insights into the performance of an application's backend queries, developers can implement data-backed thresholds with the query-flow NPM package, such that queries slower than the set threshold will be stored in a cache database. This **increases performance** of applications by **reducing each query's time** by up to _**94%**_.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

This package assumes that a Redis instance has been set up alongside a primary relational database.

For more information about setting up a Redis database, visit: [https://redis.io/docs/getting-started/](https://redis.io/docs/getting-started/)

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
  const querystring =
    "SELECT * FROM users WHERE firstname = $1 AND lastname = $2";
  const { firstname, lastname } = req.body;
  const values = [firstname, lastname];
  const threshold = 3000; //Milliseconds
  const TTL = 30; //Seconds
  try {
    const result = await QueryFlow.autoCache(
      redisModel,
      db,
      querystring,
      values,
      threshold,
      TTL
    );
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

- []() **redisModel:** Redis client to be set as 'redisModel' or imported as 'redisModel'.
- []() **db:** Database client to be set as 'db' or imported as 'db'.
- []() **querystring:** SQL query string.
- []() **values:** Array of values to bound to SQL query string
- []() **threshold:** Threshold in milliseconds (ms)
- []() **TTL:** Time to Live (TTL) in seconds (s)

We recommend using the _volatile-ttl_ eviction policy with this package to take advantage of the data's TTL, in the even that maximum memory is reached.

### Example Use Cases

**Session Storage**

With an automatic cache backend architecture, a session store could be used to cache user session data, thereby improving the speed and efficiency of accessing session data since data is kept in a fast-access cache instead of slower primary storage, such as a relational database. The cache can store frequently accessed session data, which reduces the load on the primary database and improves response times for the user.

**Machine Learning**

Machine learning models can often be quite large and take time to load from a primary database. If an application needs to make frequent predictions in real time, it may be too slow to load the model from disk each time a prediction is needed. This NPM package can be used to cache critical components of the model in memory for fast access, significantly reducing the prediction latency and increasing the overall speed of the application.

**Frequently Fetched Data or Costly Queries**

Storing fetch requests' result sets in memory decreases the processing time for web applications that need to return data from complex queries. Furthermore, data that is frequently used need not be retrieved from a slow primary relational database, it can be kept in memory for quick retrieval as it is often requested by the client.

See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

QueryFlow - [@Query_Flow](https://twitter.com/Query_Flow) - queryflow58@gmail.com

Query Performance Visualizer and Analyzer: [https://www.query-flow.com/](https://www.query-flow.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Team

<!-- Include github and linkedin handles and links here? -->

- []() **Vivek Patel** - [GitHub](https://github.com/vkpatel007) - [LinkedIn](https://www.linkedin.com/in/vivekpatel607/)
- []() **Niko Amescua** - [GitHub](https://github.com/NikoAmescua) - [LinkedIn](https://www.linkedin.com/in/nikoamescua/)
- []() **Ryan Campbell** - [GitHub](https://github.com/cronullarc) - [LinkedIn](https://www.linkedin.com/in/ryancampbelladr/)
- []() **Philip Brown** - [GitHub](https://github.com/starfishpanda) - [LinkedIn](https://www.linkedin.com/in/philiplbrown/)
- []() **George Greer** - [GitHub](https://github.com/ggreer91) - [LinkedIn](https://www.linkedin.com/in/george-greer/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgements

The Team wholeheartedly thanks Chris Suzukida for his mentorship and support throughout the development of this project.

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
