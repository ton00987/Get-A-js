var express = require('express');
var router = express.Router();

var models = require('../models');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

function intersection(arrayA, arrayB) {
  var _intersection = [];
  var column = [];
  for (var j=0; j < arrayB.length; j++) {
    column.push(arrayB[j][0])
    if(j == arrayB.length-1) {
      for (var i=0; i < arrayA.length; i++) {
        if (column.includes(arrayA[i][0])) {
          _intersection.push(arrayA[i])
        }
      }
    }
  }
  return _intersection
}

router.get('/', function(req, res) {
  list_cate = ['']
  book_name = ''
  search_book = []
  if(req.query['com']){
    list_cate.push(req.query['com'])
  }
  if(req.query['math']){
    list_cate.push(req.query['math'])
  }
  if(req.query['phy']){
    list_cate.push(req.query['phy'])
  }
  if(req.query['sport']){
    list_cate.push(req.query['sport'])
  }
  if(req.query['book_name']){
    book_name = req.query['book_name']
  }
  console.log('list_cate length: ' + list_cate.length)
  var searchBooks = function(x){
    if(x < list_cate.length){
      models.Book.findAll({
        attributes: ['name', 'score'],
        include: [{
          model: models.Category,
          where: {
            name: {
              [Op.like]: '%' + list_cate[x] + '%'
            }
          }
        }],
        where: {
          name: {
            [Op.like]: '%' + book_name + '%'
          }
        }
      }).then(function(book){
        list_book = []
        if(book.length != 0) {
          for (var i = 0; i < book.length; i++) {
            list_book.push([book[i].name, book[i].score]);
            if(i == book.length-1) {
              search_book.push(list_book)
            }
          }
        } else {
          search_book.push(list_book)
        }
        searchBooks(x+1);
      })
    } else {
      renderBooks();
    }
  }

  var renderBooks = function(){
    console.log('search_book length: ' + search_book.length)
    if(search_book.length != 1) {
      for (var i = 1; i < search_book.length; i++) {
        search_book[0] = intersection(search_book[0], search_book[i])
        if(i == search_book.length - 1) {
          console.log('Inside for')
          console.log(search_book[0])
          res.render('book', {
            book_list: search_book[0],
            com: req.query['com'],
            math: req.query['math'],
            phy: req.query['phy'],
            sport: req.query['sport'],
            book_name: book_name
          })
        }
      }
    } else {
      console.log('Outside for')
      console.log(search_book[0])
      res.render('book', {
        book_list: search_book[0],
        com: req.query['com'],
        math: req.query['math'],
        phy: req.query['phy'],
        sport: req.query['sport'],
        book_name: book_name
      })
    }
  }

  searchBooks(0);
});

module.exports = router;
