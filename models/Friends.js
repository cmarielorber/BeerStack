const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Friends extends Model {}

Friends.init(
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
    friend_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    // friend_first_name: {
    //   type: DataTypes.STRING,
    //   references: {
    //     model: 'user',
    //     key: 'first_name'
    //   }
    // },
    // friend_last_name: {
    //   type: DataTypes.STRING,
    //   references: {
    //     model: 'user',
    //     key: 'last_name'
    //   }
    // },
  },
  {
    sequelize,
    timestamps: false, 
    freezeTableName: true,
    underscored: true,
    modelName: 'friends',
  }
);

module.exports = Friends;
