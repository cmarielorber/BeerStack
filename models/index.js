const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

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
})

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
})

module.exports = { User, Post, Comment };