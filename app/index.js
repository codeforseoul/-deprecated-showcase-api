import http from 'http';
import express from 'express';
import routes from './routes/index';
import path from 'path';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './db';
import middleware from './middleware';
import api from './api';

var app = express();
app.server = http.createServer(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 3rd party middleware
app.use(cors({exposedHeaders: ['Link']}));
app.use(bodyParser.json({limit : '100kb'}));

// connect to db
db( λ => {
  // internal middleware
  app.use(middleware());
  // api router
  app.use('/', routes());
  app.use('/api', api());

  app.server.listen(process.env.PORT || 8080);
  console.log(`Started on port ${app.server.address().port}`);
});

export default app;
