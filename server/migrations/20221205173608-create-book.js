'use strict';

const invoice = require("../models/invoice");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Books'
      , {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING
        },
        description: {
          type: Sequelize.STRING
        },
        author: {
          type: Sequelize.STRING
        },
        isRented: {
          type: Sequelize.BOOLEAN
        },
        category: {
          type: Sequelize.STRING
        },
        rent: {
          type: Sequelize.INTEGER
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Books');
  }
};