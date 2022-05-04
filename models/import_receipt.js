const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('import_receipt', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'import_receipt',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "import_receipt_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
