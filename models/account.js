const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('account', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "account_email_key"
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    uid: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "staff"
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "active"
    }
  }, {
    sequelize,
    tableName: 'account',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "account_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "account_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
