'use strict';

describe('Pagelets', function () {
  var assume = require('assume')
    , Pagelet = require('pagelet')
    , Pagelets = require('./')
    , collection;

  beforeEach(function () {
    collection = new Pagelets([
      Pagelet.extend({ name: 'first' }),
      Pagelet.extend({ name: 'second' }),
    ]);
  });

  afterEach(function () {
    collection = null;
  });

  it('can extend a regular pagelet', function () {
    var pagelet = new (Pagelet.extend(collection));

    assume(pagelet.pagelets).to.have.property('first');
    assume(pagelet.pagelets).to.have.property('second');

    Object.keys(pagelet.pagelets).forEach(function each(name) {
      assume(new pagelet.pagelets[name]).to.be.instanceof(Pagelet);
    });
  });

  describe('#length', function () {
    it('is a getter that returns the number of pagelets', function () {
      assume(collection.length).to.be.a('number');
      assume(collection.length).to.equal(2);
    });
  });

  describe('#names', function () {
    it('is a getter that returns an array of names', function () {
      assume(collection.names).to.be.an('array');
      assume(collection.names).to.include('first');
      assume(collection.names).to.include('second');
    });
  });
});