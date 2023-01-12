const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create Comment Model
class Comment extends Model {}
//create fields for Post model
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    user_id: {
        type: DataTypes.STRING,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    post_id: {
      type: DataTypes.STRING,
      references: {
        model: 'post',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;
