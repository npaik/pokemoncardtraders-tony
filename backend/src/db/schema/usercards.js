const { integer, sqliteTable } = require("drizzle-orm/sqlite-core");
const { users } = require("./users");
const { cards } = require("./cards");

const userCards = sqliteTable("user_cards", {
  userId: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  cardId: integer("card_id").references(() => cards.id, {
    onDelete: "cascade",
  }),
});

module.exports = { userCards };
