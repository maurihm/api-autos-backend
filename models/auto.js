'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Auto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Auto.init({
    marca: DataTypes.STRING,
    modelo: DataTypes.STRING,
    color: DataTypes.STRING,
    anio: DataTypes.INTEGER,
    imagen_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Auto',
  });
  return Auto;
};