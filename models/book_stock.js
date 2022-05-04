const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('book_stock', {
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
      },
      unique: "book_stock_book_id_key"
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "active"
    }
  }, {
    sequelize,
    tableName: 'book_stock',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "book_stock_book_id_key",
        unique: true,
        fields: [
          { name: "book_id" },
        ]
      },
      {
        name: "book_stock_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
