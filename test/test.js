process.env.NODE_ENV = 'test';

const app = require('../app');
const models = require('../models');

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const should = chai.should();
chai.use(chaiHttp);

describe('BookApp', () => {

  describe('Web Page Test', () => {

    it('#home page', done => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('#about page', done => {
      chai.request(app)
      .get('/about')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

  });


  describe('Database Test', () => {

    before(() => {
      return models.sequelize.sync();
    });

    it('#create 2 categories', done => {
      // create 2 categories
      models.Category.bulkCreate([
        { name: 'Computer' },
        { name: 'Math' }
      ])
      // have 2 categories
      .then(() => {
        models.Category.count()
        .then(cnt => {
          assert.equal(cnt, 2);
          done();
        });
      });
    });

    it('#create a book in 2 categories', done => {
      // find categories
      models.Category.findAll({
        where: {name: ['Computer', 'Math']}
      })
      // create a book
      .then(cate => {
        models.Book.create({
        name: 'Discrete Mathematics',
        score: '4.5'
        })
        // add new book to 2 categories
        .then(book => {
          cate[0].addBook(book);
          cate[1].addBook(book);
        })
        .then(() => {
          // have 1 book
          models.Book.count()
          .then(cnt => {
            assert.equal(cnt, 1);
          });
          // have 2 categories
          models.Category.count()
          .then(cnt => {
            assert.equal(cnt, 2);
            done();
          });
        });
      });
    });

    it('#delete all', done => {
      // delete relationship
      models.Book_Category.destroy({
        truncate: true
      });

      // delete categories
      models.Category.destroy({
        truncate: true
      })
      // no categories
      .then(() => {
        models.Category.count()
        .then(cnt => {
          assert.equal(cnt, 0);
        });
      });

      // delete books
      models.Book.destroy({
        truncate: true
      })
      // no books
      .then(() => {
        models.Book.count()
        .then(cnt => {
          assert.equal(cnt, 0);
          done();
        });
      });
    });

  });

});
