const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('publisher', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'publisher',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "publisher_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
