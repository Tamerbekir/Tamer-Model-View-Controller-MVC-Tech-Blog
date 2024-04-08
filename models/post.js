const { Model, DataTypes } = require('sequelize')
//grabbing information from the config folder with connection.js
const sequelize = require('../config/connection')

class Post extends Model { }

Post.init(
    {
        id: {
            //the id in which is given to the post that is made by the user
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            //the title name that will belong to the blog post. Set it to a max character amount of 30 characters. Cannot be left empty
            type: DataTypes.CHAR(30),
            allowNull: false,
        },
        content: {
            // the content that will be posted by the user. 
            // Set it to TEXT, which allows the user to post/write as much text as they want. 
            //cannot be left empty
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_id: {
            // The foreign key of the User table. The user id is associated with the ID from the User model
            type: DataTypes.INTEGER,
            references: {
                model: 'user', 
            },  
        },
        // added post id for comment
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'Post'
    }
)

//exporting post
module.exports = Post