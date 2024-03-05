exports.up = async function(knex) {
  await knex.schema.raw(`
    ALTER TABLE task
    DROP COLUMN priority;
  `)
  await knex.schema.raw(`
    ALTER TABLE task
    ADD COLUMN date DATE NULL,
    ADD COLUMN url TEXT NULL,
    ADD COLUMN external_id TEXT NULL;
  `)
  await knex.schema.raw(`
    ALTER TABLE task
    ADD CONSTRAINT unique_external_id_per_user UNIQUE(user_id, external_id);
  `)
};

exports.down = async function(knex) {
  await knex.schema.raw(`
    ALTER TABLE task
    DROP CONSTRAINT unique_external_id_per_user,
    DROP COLUMN external_id,
    DROP COLUMN url,
    DROP COLUMN date;
  `)
  await knex.schema.raw(`
    ALTER TABLE task
    ADD COLUMN priority INTEGER NOT NULL DEFAULT 1;
  `)
};
