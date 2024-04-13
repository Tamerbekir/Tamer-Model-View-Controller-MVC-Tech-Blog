const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Comment extends Model { }

Comment.init(
    {
        id: {
            //the id in which belongs to the Comment model. 
            // It is a primary key and a number is auto assigned to the id.
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        //content posted by the user will have max length of 65,535 characters using TEXT. Yes, that is a lot of writing.
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id: {
            //the user_id will grab/be the id from the Users model. It is a number.
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            },
        },
        post_id: {
            //the post_id will grab/be the id from the Post model. It is a number.
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id'
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

//exporting the comment model
module.exports = Comment;