const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const should = chai.should();
chai.use(chaiHttp);

describe('BookApp', () => {
  describe('Web Page Test', () => {
    it('#home page', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('#receive a GET request', (done) => {
      chai.request(app)
        .get('/?com=Computer&math=Mathematic&book_name=Discrete')
        .end((err, res) => {
          res.should.have.status(200);
          assert('com', 'Computer');
          assert('math', 'Mathematic');
          assert('book_name', 'Discrete');
          done();
        });
    });
  });
});
