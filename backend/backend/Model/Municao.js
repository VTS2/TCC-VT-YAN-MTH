const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('../Model/User')

const Municao = db.define('Municao', {
    
    calibre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    valor:{
        type: DataTypes.FLOAT,
        allowNull: false
    }
})

Municao.belongsTo(User)
User.hasMany(Municao)

module.exports = Municao