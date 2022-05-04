const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('book', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "book_isbn_key"
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    num_page: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    publication_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    publisher_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'publisher',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'book',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "book_isbn_key",
        unique: true,
        fields: [
          { name: "isbn" },
        ]
      },
      {
        name: "book_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
