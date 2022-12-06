'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    author: DataTypes.STRING,
    isRented: DataTypes.BOOLEAN,
    category: DataTypes.STRING,
    rent: DataTypes.INTEGER
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
    Book.hasMany(models.Invoice);
  };
  return Book;
};