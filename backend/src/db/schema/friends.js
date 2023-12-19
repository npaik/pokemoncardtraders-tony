const { integer, sqliteTable } = require('drizzle-orm/sqlite-core');
const { users } = require('./users');

const friends = sqliteTable('friends', {
  userId: integer('user_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
  friendId: integer('friend_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
});

module.exports = { friends };
