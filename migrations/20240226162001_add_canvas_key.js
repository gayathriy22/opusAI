exports.up = async function(knex) {
  await knex.schema.raw(`
    ALTER TABLE users
    ADD COLUMN canvas_token TEXT NULL;
  `)
};

exports.down = async function(knex) {
  await knex.schema.raw(`
    ALTER TABLE users
    DROP COLUMN canvas_token;
  `)
};
