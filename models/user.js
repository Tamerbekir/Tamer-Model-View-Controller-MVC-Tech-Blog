const { Model, DataTypes } = require('sequelize')
//brining in data from the config folder, connection.js file
const sequelize = require('../config/connection')

class User extends Model { }

//this is for the user and their information 
User.init(
    {
        id: {
            //users' id will be a number and a primary key that is auto generated
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            //username has to be text with no empty value and must be unique
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            //user password must be text, cannot be left empty and will be validated using certain criteria.
            type: DataTypes.STRING,
            allowNull: false,
            // validate: {
            //     //password needs to have at least 8 characters
            //     min: 8
            // }
        },
    },
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'User',
    }
)

//exporting model User data
module.exports = User