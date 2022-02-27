import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('user', (table) => {
      table.increments();
      table.string('full_name').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.timestamps(true, true);
    })
    .createTable('payment', (table) => {
      table.increments();
      table.string('name').notNullable();
      table.integer('amount').notNullable();
      table.string('description');
      table.integer('user_id').references('id').inTable('user').notNullable();
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('payment').dropTableIfExists('user');
}
