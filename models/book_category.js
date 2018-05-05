'use strict';
module.exports = (sequelize, DataTypes) => {
  var Book_Category = sequelize.define('Book_Category', {}, {});
  Book_Category.associate = function(models) {
    // associations can be defined here
  };
  return Book_Category;
};