//model/ImagePet.js
const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Arma = require('./Arma')

const ImageArma = db.define('ImageArma', {
    image:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

//a imagem pertence a 1 pet
ImageArma.belongsTo(Arma)
//um pet tem varias imagens
Arma.hasMany(ImageArma)

module.exports = ImageArma