import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // truncate all existing tables
  await knex.raw('TRUNCATE TABLE "user" CASCADE');
  await knex.raw('TRUNCATE TABLE "payment" CASCADE');

  // Inserts seed entries
  await knex('user').insert([
    {
      id: 1,
      full_name: 'Manchester',
      email: 'test1@gmail.com',
      password: '12345',
    },
    { id: 2, full_name: 'Madrid', email: 'test2@gmail.com', password: '12345' },
    { id: 3, full_name: 'Bayern', email: 'test3@gmail.com', password: '12345' },
  ]);

  await knex('payment').insert([
    {
      id: 1,
      name: 'capital',
      amount: 200,
      description: 'expenses on staduim project',
      user_id: 1,
    },
    {
      id: 2,
      name: 'wages',
      amount: 200,
      description: 'expenses on player wages',
      user_id: 2,
    },
    {
      id: 3,
      name: 'transfer',
      amount: 200,
      user_id: 1,
    },
  ]);
}
