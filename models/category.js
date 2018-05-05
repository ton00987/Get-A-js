'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    name: DataTypes.TEXT
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
    Category.belongsToMany(Book, {through: 'Book_Category'});
  };
  return Category;
};