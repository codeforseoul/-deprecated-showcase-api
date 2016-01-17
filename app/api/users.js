import resource from 'resource-router-middleware';
import users from '../models/users';
import Query from '../lib/query';

let reqQuery = Query();

export default resource({

  /** Property name to store preloaded entity on `request`. */
  id : 'user',

  /** For requests with an `id`, you can auto-load the entity.
   *  Errors terminate the request, success sets `req[id] = data`.
   */
  load(req, id, callback) {
    // var user = users.find( user => user.id === id ),
      // err = user ? null : 'Not found';
    callback();
  },

  /** GET / - List all entities */
  index({ query }, res) {
    let rows = [];
    let err = false;

    reqQuery.get('User', query)
      .on('error', function(err) {
        console.error(err);
        // Handle error, an 'end' event will be emitted after this as well
      })
      // .on('fields', function(fields) {
      //   console.log(fields);
      //   // the field packets for the rows to follow
      // })
      .on('result', function(row) {
        // Pausing the connnection is useful if your processing involves I/O
        rows.push(row);
      })
      .on('end', function(test) {
        if (err) res.json(err);
        else res.json(rows);
      });
    // res.json(users);
  },

  /** POST / - Create a new entity */
  create({ body }, res) {
    body.id = users.length.toString(36);
    users.push(body);
    res.json(body);
  },

  /** GET /:id - Return a given entity */
  read({ params }, res) {
    console.log(params);
    res.json([]);
    // res.json(req.user);
  },

  /** PUT /:id - Update a given entity */
  update({ user, body }, res) {
    for (let key in body) {
      if (key!=='id') {
        user[key] = body[key];
      }
    }
    res.sendStatus(204);
  },

  /** DELETE /:id - Delete a given entity */
  delete({ user }, res) {
    users.splice(users.indexOf(user), 1);
    res.sendStatus(204);
  }
});
