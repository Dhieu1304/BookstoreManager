const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('book_author', {
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'book',
        key: 'id'
      }
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'author',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'book_author',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "book_author_pkey",
        unique: true,
        fields: [
          { name: "book_id" },
          { name: "author_id" },
        ]
      },
    ]
  });
};
