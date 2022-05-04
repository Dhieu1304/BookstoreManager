const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('book_image', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'book',
        key: 'id'
      }
    },
    src: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'book_image',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "book_image_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
