/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  if (await knex.schema.hasTable('task')) return
  await knex.schema.raw(`
    CREATE TABLE task (
      task_id SERIAL PRIMARY KEY NOT NULL,
      user_id TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT NULL,
      priority INTEGER NOT NULL DEFAULT 1,
      FOREIGN KEY (user_id) REFERENCES users(uid)
    );
  `)
};

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = async function (knex) {
  await knex.schema.raw('DROP TABLE task;')
};
