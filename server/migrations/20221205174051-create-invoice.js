'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Invoices',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        rentedOn: {
          type: Sequelize.DATE
        },
        rent: {
          type: Sequelize.INTEGER
        },
        dueCleared: {
          type: Sequelize.BOOLEAN
        },
        dueClearedOn: {
          type: Sequelize.DATE
        },
        dueDate: {
          type: Sequelize.DATE
        },
        penaltyDays: {
          type: Sequelize.INTEGER
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        BookId: {
          type: Sequelize.INTEGER
        },
        UserId: {
          type: Sequelize.INTEGER
        }
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Invoices');
  }
};