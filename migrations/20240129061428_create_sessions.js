/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    if (!await knex.schema.hasTable('session')) {
        await knex.schema.raw(`
            CREATE TABLE session (
                sid    TEXT PRIMARY KEY NOT NULL,
                sess   JSON NULL,
                expire TIMESTAMP NULL
            );
        `)
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.raw('DROP TABLE session;')
};
