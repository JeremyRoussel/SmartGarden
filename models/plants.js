'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class plants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.plants.belongsTo(models.users, {foreignKey: 'plantOwner'})
      models.plants.hasMany(models.data, {foreignKey: 'plantID'})
    }
  };
  plants.init({
    plantOwner: DataTypes.INTEGER,
    plantType: DataTypes.STRING,
    plantName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'plants',
  });
  return plants;
};