const { text, integer, sqliteTable } = require('drizzle-orm/sqlite-core');

const cards = sqliteTable('cards', {
  id: integer('card_id', { mode: 'number' })
    .notNull()
    .primaryKey({ autoIncrement: true }),
  cardname: text('card_name').notNull().unique(),
  cardurl: text('card_url').notNull(),
});

module.exports = { cards };
