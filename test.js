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
});