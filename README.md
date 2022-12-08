## RentABook

This is nodeJS backend for renting book platform.

### Setup
```
 $ npm install
 $ node_modules/.bin/sequelize init
```
Sequelize init will creat a folder `config`,`controller`,`migrations` and `models`

create a file called `.sequelizerc`
```
const path = require('path');

module.exports = {
  "config": path.resolve('./server/config', 'config.json'),
  "models-path": path.resolve('./server/models'),
  "seeders-path": path.resolve('./server/seeders'),
  "migrations-path": path.resolve('./server/migrations')
};
```

Create a Database `testdb` in Postgres Dashboard

```
$ node_modules/.bin/sequelize db:migrate      
```

#### To Run Application

```
$ node index.js
```
