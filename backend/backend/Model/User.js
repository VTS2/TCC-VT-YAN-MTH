//User.js
const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CPF: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // imgIdent: {
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    // laudoCap: {
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    // imgFicha: {
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
})
module.exports = User