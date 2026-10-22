const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Material = require('./Material');
const Usuario = require('./Usuario');
 
const Movimentacao = sequelize.define('Movimentacao', {
  tipo: {
    type: DataTypes.ENUM('entrada', 'saida'),
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  data: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});
 
Material.hasMany(Movimentacao, { foreignKey: 'material_id' });
Movimentacao.belongsTo(Material, { foreignKey: 'material_id' });
Usuario.hasMany(Movimentacao, { foreignKey: 'usuario_id' }); 
Movimentacao.belongsTo(Usuario, { foreignKey: 'usuario_id' }); 

module.exports = Movimentacao;
