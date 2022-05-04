const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('book_category', {
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'book',
        key: 'id'
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'category',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'book_category',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "book_category_pkey",
        unique: true,
        fields: [
          { name: "book_id" },
          { name: "category_id" },
        ]
      },
    ]
  });
};
