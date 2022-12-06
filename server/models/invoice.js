'use strict';
module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('Invoice', {
    rentedOn: DataTypes.DATE,
    rent: DataTypes.INTEGER,
    dueCleared: DataTypes.BOOLEAN,
    dueClearedOn: DataTypes.DATE,
    dueDate: DataTypes.DATE,
    penaltyDays: DataTypes.INTEGER
  }, {});
  Invoice.associate = function (models) {
    // associations can be defined here
    Invoice.belongsTo(models.Book);
    Invoice.belongsTo(models.User);
  };
  return Invoice;
};