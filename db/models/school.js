const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

module.exports = sequelize.define(
    'school',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'name cannot be null',
                },
                notEmpty: {
                    msg: 'name cannot be empty',
                },
            },
        },
        address: {
            type: DataTypes.STRING,
            defaultValue: false,
            allowNull: false,
            validate: {
              notNull: {
                  msg: 'address cannot be null',
              },
              notEmpty: {
                  msg: 'address cannot be empty',
              },
            },
        },
        latitude: {
          type: DataTypes.FLOAT,
          defaultValue: false,
          allowNull: false,
          validate: {
            notNull: {
                msg: 'latitude cannot be null',
            },
            notEmpty: {
                msg: 'latitude cannot be empty',
            },
          },
        },
        longitude: {
          type: DataTypes.FLOAT,
          defaultValue: false,
          allowNull: false,
          validate: {
            notNull: {
                msg: 'longitude cannot be null',
            },
            notEmpty: {
                msg: 'longitude cannot be empty',
            },
          },
        },
        createdBy: {
            type: DataTypes.INTEGER,
            references: {
                model: 'school',
                key: 'id',
            },
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
    },
    {
        paranoid: true,
        freezeTableName: true,
        modelName: 'school',
    }
);