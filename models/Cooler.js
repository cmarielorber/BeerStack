const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Cooler extends Model {}

Cooler.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      }
    },
    beer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'beers',
        key: 'id',
      },
    },
    // beer_name: {
    //   type: DataTypes.STRING,
    //   references: {
    //     model: 'beers',
    //     key: 'name',
    //   },
    // }
  },
  {
    sequelize,
    timestamps: false, 
    freezeTableName: true,
    underscored: true,
    modelName: 'cooler',
  }
);

module.exports = Cooler;
