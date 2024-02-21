/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  if (!await knex.schema.hasTable('users')) {
    await knex.schema.raw(`
      CREATE TABLE users (
        uid TEXT PRIMARY KEY NOT NULL,
        email TEXT NOT NULL,
        name TEXT NOT NULL,
        picture TEXT NOT NULL
      );
    `)
  }
};

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = async function (knex) {
  await knex.schema.raw('DROP TABLE users;')
};
