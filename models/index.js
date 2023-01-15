const User = require('./User');
const Cooler = require('./Cooler');
const Beers = require('./Beers');
const Friends = require('./Friends');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasOne(Cooler, {
  foreignKey: 'cooler_id'
});

Cooler.belongsTo(User, {
  foreignKey: 'id',
});

Cooler.hasMany(Beers, {
  foreignKey: 'id',
})

User.hasOne(Friends, {
  foreignKey: 'id',
})

Friends.hasMany(User, {
  foreignKey: 'id',
  // foreignKey: 'first_name',
  // foreignKey: 'last_name',
})

Friends.belongsTo(User, {
  foreignkey: 'id',
  onDelete: 'SET NULL',
})

User.hasMany(Post, {
  foreignkey: 'user_id',
});

Post.belongsTo(User, {
  foreignkey: 'user_id',
  onDelete: 'SET NULL',
});

Comment.belongsTo(User, {
  foreignkey: 'user_id',
  onDelete: 'SET NULL',
});

Comment.belongsTo(Post, {
  foreignkey: 'post_id',
  onDelete: 'SET NULL',
});

User.hasMany(Comment, {
  foreignkey: 'user_id',
  onDelete: 'SET NULL',
});

Post.hasMany(Comment, {
  foreignkey: 'post_id',
});

module.exports = { User, Post, Comment };
