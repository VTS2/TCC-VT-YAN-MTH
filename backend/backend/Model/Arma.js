const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('../Model/User')

const Arma = db.define('Arma', {
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    valor:{
        type: DataTypes.FLOAT,
        allowNull: false
    }
})

Arma.belongsTo(User)
User.hasMany(Arma)

module.exports = Arma