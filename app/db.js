import mysql from 'mysql';
import minimist from 'minimist';

const NAMES = {
  'database': 'showcase',
  'user': 'User',
  'project': 'Project',
  'contributor': 'Contributor'
}

let queries = {
  'createDb': `CREATE DATABASE ${NAMES.database} DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci`,
  'createUserTable': `CREATE TABLE ${NAMES.user} (id int auto_increment primary key, username varchar(30), password varchar(100))`,
  'createProjectTable': `CREATE TABLE ${NAMES.project} (id int auto_increment primary key, title varchar(30), description varchar(200))`,
  'createOwnerTable': `create table ${NAMES.owner} (owner int not null, project int not null, primary key(owner, project), foreign key (owner) references ${NAMES.user}(id) on update cascade, foreign key (project) references ${NAMES.project}(id) on update cascade)`,
  'createContributorTable': `create table ${NAMES.contributor} (contributor int not null, project int not null, primary key(contributor, project), foreign key (contributor) references ${NAMES.user}(id) on update cascade, foreign key (project) references ${NAMES.project}(id) on update cascade)`,
  'dropUserTable': `DROP TABLE ${NAMES.user}`,
  'dropProjectTable': `DROP TABLE ${NAMES.project}`
}

export default function(callback) {
  let argv = minimist(process.argv.slice(2));
  let doReset = argv.reset;
  
  let conn = mysql.createConnection({
    host     : 'localhost',
    user     : process.env.mysqlUsername,
    password : process.env.mysqlPassword
  });

  sendQuery(conn, `${queries.createDb}`)
    // create database named 'showcase'
    .then(status => {
      conn.changeUser({database: NAMES.database});
      return sendQuery(conn, queries.createUserTable)
    })
    .then(status => {
      return sendQuery(conn, queries.createProjectTable)
    })
    .then(status => {
      return sendQuery(conn, queries.createOwnerTable)
    })
    .then(status => {
      console.log(status);
      callback(conn);
    })
    .catch(err => {
      console.error(err);
    })
}

function sendQuery(conn, query) {
  return new Promise((resolve, reject) => {
    conn.query(query, (err, var1, var2) => {
      if (err) reject(err);
      
      resolve(var1, var2);
    })
  });
}

function resetDb(conn) {
  let queries = `${queries.dropUserTable};${queries.dropProjectTable}`;
  return sendQuery(conn, queries);
}
