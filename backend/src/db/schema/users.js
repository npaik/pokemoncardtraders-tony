const { text, integer, sqliteTable } = require("drizzle-orm/sqlite-core");
const { cards } = require("./cards");

const users = sqliteTable("users", {
  id: integer("user_id", { mode: "number" })
    .notNull()
    .primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
});

module.exports = { users };
