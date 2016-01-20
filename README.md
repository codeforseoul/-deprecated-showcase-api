Showcase API - Express ES6
==================================

- ES6 support via [babel](https://babeljs.io)
- REST resources as middleware via [resource-router-middleware](https://github.com/developit/resource-router-middleware)
- CORS support via [cors](https://github.com/troygoode/node-cors)
- Body Parsing via [body-parser](https://github.com/expressjs/body-parser)

Getting Started
---------------

```sh
# setting up database using docker
# create data-only container
docker create --name showcase-data thechunsik/showcase-data
# create database contain
docker run --name showcase-mysql --volumes-from showcase-data -v /var/lib/mysql:/var/lib/mysql -e MYSQL_USER=<username> -e MYSQL_PASSWORD=<password> -e MYSQL_DATABASE=showcase -e MYSQL_ROOT_PASSWORD=<rootpassword> -it -p 3306:3306 mysql

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


Credit
------
- [express-es6-rest-api](https://github.com/developit/express-es6-rest-api)
- [passport-github](https://github.com/jaredhanson/passport-github)
- [generator-backbone](https://github.com/yeoman/generator-backbone)

License
-------
MIT
