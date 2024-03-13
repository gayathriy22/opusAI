exports.up = async function(knex) {
  await knex.schema.raw(`
    ALTER TABLE task
    ADD COLUMN complete BOOLEAN NOT NULL DEFAULT FALSE;
  `)
};

exports.down = async function(knex) {
  await knex.schema.raw(`
    ALTER TABLE task
    DROP COLUMN complete;
  `)
};
