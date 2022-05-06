const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sale_receipt_detail', {
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'book',
        key: 'id'
      }
    },
    sale_receipt_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'sale_receipt',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'sale_receipt_detail',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "sale_receipt_detail_pkey",
        unique: true,
        fields: [
          { name: "book_id" },
          { name: "sale_receipt_id" },
        ]
      },
    ]
  });
};
