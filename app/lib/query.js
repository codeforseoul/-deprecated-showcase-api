import mysql from 'mysql';

export default function () {
  let conn = mysql.createConnection({
    host     : '192.168.99.100',
    user     : process.env.mysqlUsername,
    password : process.env.mysqlPassword,
    database : 'showcase'
  });

  let queries = {
    get: (table, query) => {
      let defaultQ = `SELECT * FROM ${table}`;

      if (Object.keys(query) !== 0) {
        let where = ' where';
        Object.keys(query).forEach(key => {
          where += ` ${key} = '${query[key]}'`;
        });
        defaultQ += where;
      }

      return defaultQ;
    }
  }

  return {
    get: (table, query) => {
      return conn.query(queries.get(table, query))
    }
  }
}

