/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import Todo from '../api/todo/todo.model';
import User from '../api/user/user.model';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    Thing.find({}).remove();
    Todo.find({}).remove()
      .then(() => {
        Todo.create({
          name: 'Routes',
          info: 'Add model to routes'
        }, {
          name: 'Error Page',
          info: 'Create standalone error page in routes'
        }, {
          name: 'Session secret',
          info: 'Change session secret '
                + 'in local.env.js'
        }, {
          name: 'Database reference',
          info: 'Change database reference in environments '
                + 'in production.js'
                + 'in development.js'
                + 'in test.js'
        }, {
          name: 'Optimized Build',
          info: 'Build process packs up your templates as a single JavaScript '
                + 'payload, minifies your scripts/css/images, and rewrites asset '
                + 'names for caching.'
        }, {
          name: 'Deployment Ready',
          info: 'Easily deploy your app to Heroku or Openshift with the heroku '
                + 'and openshift subgenerators'
        });
      })
    .then(() => console.log('finished populating todos'))
    .catch(err => console.log('error populating todos', err));

    User.find({}).remove()
      .then(() => {
        User.create({
          provider: 'local',
          name: 'Test User',
          email: 'test@example.com',
          password: 'test'
        }, {
          provider: 'local',
          role: 'admin',
          name: 'Admin',
          email: 'admin@example.com',
          password: 'admin'
        })
        .then(() => console.log('finished populating users'))
        .catch(err => console.log('error populating users', err));
      });
  }
}
