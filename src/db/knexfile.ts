// Update with your config settings.
import { knexSnakeCaseMappers } from 'objection';

export default {
  development: {
    client: 'postgresql',
    connection: {
      database: 'test',
      user: 'decagon',
      password: 'Oluwachumzy1',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds',
    },
    ...knexSnakeCaseMappers,
  },
};
