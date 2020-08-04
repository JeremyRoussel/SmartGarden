'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.data.belongsTo(models.plants, {foreignKey: 'plantID'})
    }
  };
  data.init({
    plantID: DataTypes.INTEGER,
    humidity: DataTypes.INTEGER,
    light: DataTypes.INTEGER,
    temperature: DataTypes.INTEGER,
    moisture: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'data',
  });
  return data;
};