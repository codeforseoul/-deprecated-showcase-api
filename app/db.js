import mysql from 'mysql';
import minimist from 'minimist';
import config from './config';

const NAMES = {
  'user': 'User',
  'project': 'Project',
  'owner': 'Owner',
  'contributor': 'Contributor'
}

let queries = {
  'createUserTable': `CREATE TABLE ${NAMES.user} (id int auto_increment primary key, username varchar(30), password varchar(100))`,
  'createProjectTable': `CREATE TABLE ${NAMES.project} (id int auto_increment primary key, title varchar(30), description varchar(200))`,
  'createOwnerTable': `create table ${NAMES.owner} (owner int not null, project int not null, primary key(owner, project), foreign key (owner) references ${NAMES.user}(id) on update cascade, foreign key (project) references ${NAMES.project}(id) on update cascade)`,
  'createContributorTable': `create table ${NAMES.contributor} (contributor int not null, project int not null, primary key(contributor, project), foreign key (contributor) references ${NAMES.user}(id) on update cascade, foreign key (project) references ${NAMES.project}(id) on update cascade)`,
  'createOwnerTable': `create table ${NAMES.owner} (owner int not null, project int not null, primary key(owner, project), foreign key (owner) references ${NAMES.user}(id) on update cascade, foreign key (project) references ${NAMES.project}(id) on update cascade)`,
  'dropUserTable': `DROP TABLE ${NAMES.user}`,
  'dropProjectTable': `DROP TABLE ${NAMES.project}`,
  'dropContributorTable': `DROP TABLE ${NAMES.contributor}`,
  'dropOwnerTable': `DROP TABLE ${NAMES.owner}`
}

export default function(callback) {
  let argv = minimist(process.argv.slice(2));
  let doReset = argv.reset;
  
  let conn = mysql.createConnection({
    host     : '192.168.99.100',
    user     : process.env.mysqlUsername,
    password : process.env.mysqlPassword,
    database : config.database
  });

  sendQuery(conn, queries.createUserTable)
    .then(status => {
      return sendQuery(conn, queries.createProjectTable)
    })
    .then(status => {
      return sendQuery(conn, queries.createOwnerTable)
    })
    .then(status => {
      callback(conn);
    })
    .catch(err => {
      let errno = err.errno;

      if (errno == 1050) {
        // this error means that tables are already exist
        callback(conn);
      } else {
        console.error(err);
        process.exit()
      }
    });

    // conn.end();
}

function sendQuery(conn, query) {
  return new Promise((resolve, reject) => {
    conn.query(query, (err, var1, var2) => {
      if (err) reject(err);
      resolve(var1, var2);
    })
  });
}
