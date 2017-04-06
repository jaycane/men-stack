'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newTodo;

describe('Todo API:', function() {
  describe('GET /api/todos', function() {
    var todos;

    beforeEach(function(done) {
      request(app)
        .get('/api/todos')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          todos = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(todos).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/todos', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/todos')
        .send({
          name: 'New Todo',
          info: 'This is the brand new todo!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newTodo = res.body;
          done();
        });
    });

    it('should respond with the newly created todo', function() {
      expect(newTodo.name).to.equal('New Todo');
      expect(newTodo.info).to.equal('This is the brand new todo!!!');
    });
  });

  describe('GET /api/todos/:id', function() {
    var todo;

    beforeEach(function(done) {
      request(app)
        .get(`/api/todos/${newTodo._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          todo = res.body;
          done();
        });
    });

    afterEach(function() {
      todo = {};
    });

    it('should respond with the requested todo', function() {
      expect(todo.name).to.equal('New Todo');
      expect(todo.info).to.equal('This is the brand new todo!!!');
    });
  });

  describe('PUT /api/todos/:id', function() {
    var updatedTodo;

    beforeEach(function(done) {
      request(app)
        .put(`/api/todos/${newTodo._id}`)
        .send({
          name: 'Updated Todo',
          info: 'This is the updated todo!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedTodo = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTodo = {};
    });

    it('should respond with the updated todo', function() {
      expect(updatedTodo.name).to.equal('Updated Todo');
      expect(updatedTodo.info).to.equal('This is the updated todo!!!');
    });

    it('should respond with the updated todo on a subsequent GET', function(done) {
      request(app)
        .get(`/api/todos/${newTodo._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let todo = res.body;

          expect(todo.name).to.equal('Updated Todo');
          expect(todo.info).to.equal('This is the updated todo!!!');

          done();
        });
    });
  });

  describe('PATCH /api/todos/:id', function() {
    var patchedTodo;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/todos/${newTodo._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Todo' },
          { op: 'replace', path: '/info', value: 'This is the patched todo!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedTodo = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedTodo = {};
    });

    it('should respond with the patched todo', function() {
      expect(patchedTodo.name).to.equal('Patched Todo');
      expect(patchedTodo.info).to.equal('This is the patched todo!!!');
    });
  });

  describe('DELETE /api/todos/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/todos/${newTodo._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when todo does not exist', function(done) {
      request(app)
        .delete(`/api/todos/${newTodo._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
