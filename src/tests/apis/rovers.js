import app from '../../../server'
const request = require('supertest');
const assert = require('assert');


  request(app)
    .get('/api/rovers')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
    });