//bringing in User model
const User = require('./user')
//bringing in Comment model
const Comment = require('./comments')
//bringing in User model
const Post = require('./post');

// The user has many posts, and the id to said user is the user_id from the Post model
User.hasMany(Post, {
    foreignKey: 'user_id'
})

// Each post belongs to the User, and the id to said posts is the user_id from the Post model
Post.belongsTo(User, {
    foreignKey: 'user_id',
})

// A post can have many comments, and the id to said Posts is the post_id in the Comment model
Post.hasMany(Comment, {
    foreignKey: 'post_id'
})

// A comment only belongs to ONE user, and the id to said user is the user_id from the Comment model 
Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

// a comment only belongs to ONE post, and the id to said post is the post_id from the Comment table
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
})

module.exports = { User, Comment, Post };