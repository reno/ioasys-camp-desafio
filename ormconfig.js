const { User } = require('./src/shared/entities/user/user.entity');
const { City } = require('./src/shared/entities/location/city.entity');
const { State } = require('./src/shared/entities/location/state.entity');
const { File } = require('./src/shared/entities/file/file.entity');

require('dotenv/config');

module.exports = [
  {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    //use_env_variable: 'DATABASE_URL',
    synchronize: false,
    logging: true,
    entities: [ //'dist/shared/entities/**/*.entity.js'
      User,
      City,
      State,
      File
    ],
    migrations: ['infra/typeorm/migrations/*.ts'],
    cli: {
      entitiesDir: 'src/shared/entities/',
      migrationsDir: 'infra/typeorm/migrations',
    },
    ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      },
  },
  {
    name: 'seed',
    type: 'postgres',
    url: process.env.DATABASE_URL,
    //use_env_variable: 'DATABASE_URL',
    synchronize: false,
    entities: [ //'dist/shared/entities/**/*.entity.js'
      User,
      City,
      State
    ],
    migrations: ['infra/typeorm/seeds/*.ts'],
    cli: {
      migrationsDir: 'infra/typeorm/seeds',
    },
    ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      },
  },
]

