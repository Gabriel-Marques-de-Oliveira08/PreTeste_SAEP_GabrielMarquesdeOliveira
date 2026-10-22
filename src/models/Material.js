const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
 
const Material = sequelize.define('Livro', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  preco: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
 
  quantidade_estoque: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});
 
module.exports = Material;
