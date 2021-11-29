const promise = require('bluebird');
const options = {
    promiseLib: promise,
    query: (e) => {}
}

const pgp = require('pg-promise')(options);
const types = pgp.pg.types;
types.setTypeParser(1114, function(stringValue) {
    return stringValue;
});

/* configuración Desarrollo
const databaseConfig = {
    'host': '127.0.0.1',
    'port': 5432,
    'database': 'bd_precotexmovil',
    'user': 'postgres',
    'password': 'admin'
};
*/
/* Esta configuración no funcionó para despliegue con Heroku
const databaseConfig = {
    'host': 'ec2-23-23-219-25.compute-1.amazonaws.com',
    'port': 5432,
    'database': 'decj1uaeuh1ij7',
    'user': 'cgxzwxtrkhrdci',
    'password': '62829a000df0c0b2b80812e80cec9953b4b64cbae11380e190207255e4d8686f'
};
*/
/*Esta configuración no funcionó para despliegue con Heroku
const databaseConfig = {
    username: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOSTNAME,
    port: 5432,
    ssl: true,
    dialect: 'postgres',
    dialectOptions: {
      "ssl": {"require":true }
    }
  };*/

  const databaseConfig = {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  };

const db = pgp(databaseConfig);

module.exports = db;