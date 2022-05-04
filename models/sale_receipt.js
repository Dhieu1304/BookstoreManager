const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sale_receipt', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'customer',
        key: 'id'
      }
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'sale_receipt',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "sale_receipt_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
