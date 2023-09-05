
const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Municao = require('./Municao')

const ImageMunicao = db.define('ImageMunicao', {
    image:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

//a imagem pertence a 1 pet
ImageMunicao.belongsTo(Municao)
//um pet tem varias imagens
Municao.hasMany(ImageMunicao)

module.exports = ImageMunicao