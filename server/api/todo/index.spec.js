'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var todoCtrlStub = {
  index: 'todoCtrl.index',
  show: 'todoCtrl.show',
  create: 'todoCtrl.create',
  upsert: 'todoCtrl.upsert',
  patch: 'todoCtrl.patch',
  destroy: 'todoCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var todoIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './todo.controller': todoCtrlStub
});

describe('Todo API Router:', function() {
  it('should return an express router instance', function() {
    expect(todoIndex).to.equal(routerStub);
  });

  describe('GET /api/todos', function() {
    it('should route to todo.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'todoCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/todos/:id', function() {
    it('should route to todo.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'todoCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/todos', function() {
    it('should route to todo.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'todoCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/todos/:id', function() {
    it('should route to todo.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'todoCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/todos/:id', function() {
    it('should route to todo.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'todoCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/todos/:id', function() {
    it('should route to todo.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'todoCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
