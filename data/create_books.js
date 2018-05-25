var csv = require('fast-csv');
var models = require('../models');

var parser = csv
  .fromPath("data/all_book.csv")
  .on("data", function(data){
    console.log(data);
    parser.pause();
    more_cate = data[2].split(',');

    var startItems = function(){
      parser.resume();
    }

    var processItems = function(x){
      if(x < more_cate.length){    
        models.Category.findOrCreate({
          where: {name: more_cate[x]}
        }).spread(function(cate){
          models.Book.findOrCreate({
            where: {name: data[0]},
            defaults: {score: data[1]}
          }).spread(function(book){
            cate.addBook(book);
            processItems(x+1);
          });
        });
      } else {
        startItems();
      }
    }
    processItems(0);
  })
  .on("end", function(){
    console.log("done");
  });