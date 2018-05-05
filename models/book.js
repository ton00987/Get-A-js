'use strict';
module.exports = (sequelize, DataTypes) => {
  var Book = sequelize.define('Book', {
    name: DataTypes.TEXT,
    score: DataTypes.FLOAT
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
    Book.belongsToMany(Category, {through: 'Book_Category'});
  };
  return Book;
};