Showcase API - Express ES6
==================================
I forked [express-es6-rest-api](https://github.com/developit/express-es6-rest-api) for this project.

This is a straightforward boilerplate for building REST APIs with ES6 and Express.

- ES6 support via [babel](https://babeljs.io)
- REST resources as middleware via [resource-router-middleware](https://github.com/developit/resource-router-middleware)
- CORS support via [cors](https://github.com/troygoode/node-cors)
- Body Parsing via [body-parser](https://github.com/expressjs/body-parser)

> Tip: If you are using [Mongoose](https://github.com/Automattic/mongoose), you can automatically expose your Models as REST resources using [mongoose-resource](https://gist.github.com/developit/ec2f438efc5feea4fd3a).

Getting Started
---------------

```sh
# clone it
git clone https://github.com/codeforseoul/showcase-api
cd showcase-api

# Run it
npm start

# With nodemon:
PORT=8080 nodemon
```

Roadmap
-------
- [Grunt](http://gruntjs.com/) or [Gulp](http://gulpjs.com/) for debugging
- Modeling with [Mongoose](https://github.com/Automattic/mongoose)
- Building Rest API for [showcase](https://github.com/codeforseoul/showcase)
- Setting Views with [showcase](https://github.com/codeforseoul/showcase)


License
-------
MIT
