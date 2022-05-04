const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('import_receipt_detail', {
    report_receipt_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'import_receipt',
        key: 'id'
      }
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'book',
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
    tableName: 'import_receipt_detail',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "import_receipt_detail_pkey",
        unique: true,
        fields: [
          { name: "report_receipt_id" },
          { name: "book_id" },
        ]
      },
    ]
  });
};
