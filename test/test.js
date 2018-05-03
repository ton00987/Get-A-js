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

    it('#about page', (done) => {
      chai.request(app)
        .get('/about')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
