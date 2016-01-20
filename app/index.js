import http from 'http';
import express from 'express';
import session from 'express-session';
import routes from './routes/index';
import path from 'path';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './db';
import middleware from './middleware';
import api from './api';
import passport from 'passport';
import { Strategy } from 'passport-github';

import config from './config';

var app = express();
app.server = http.createServer(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/app'));

app.use(session({
  secret: 'showcase is the best framework for open communities.',
  resave: false,
  saveUninitialized: true
}));

// 3rd party middleware
app.use(cors({exposedHeaders: ['Link']}));
app.use(bodyParser.json({limit : '100kb'}));

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(new Strategy({
    clientID: process.env.githubClientId,
    clientSecret: process.env.githubClientSecret,
    callbackURL: `http://127.0.0.1:${config.port}/auth/github/callback`
  },(accessToken, refreshToken, profile, done) => {
    // asynchronous verification, for effect...
    process.nextTick(() => {
      
      // To keep the example simple, the user's GitHub profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the GitHub account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.
passport.serializeUser((user, done) => { done(null, user); });
passport.deserializeUser((obj, done) => { done(null, obj); });

// connect to db
db( λ => {
  console.log('database connected successfully');
  
  // internal middleware
  app.use(middleware());

  // api router
  app.use('/', routes());

  app.use('/api', api());

  app.server.listen(process.env.PORT || config.port);
  console.log(`Started on port ${app.server.address().port}`);
});

export default app;
