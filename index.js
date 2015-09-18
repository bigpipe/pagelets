'use strict';

var destroy = require('demolish')
  , fuse = require('fusing');

function Pagelets(pagelets) {
  this.fuse();
  this.readable('pagelets', {});

  this.add(pagelets);
}

fuse(Pagelets, require('eventemitter3'));

Pagelets.readable('add', function add(Pagelets) {
  each(Pagelets, function each(Pagelet) {
    this.pagelets[Pagelet.prototype.name] = Pagelet;
  }, this);
});

Pagelets.readable('remove', function remove(Pagelets) {
  each(Pagelets, function each(Pagelet) {
    if ('object' === typeof Pagelet) Pagelet = Pagelet.prototype.name;

    delete this.pagelets[Pagelet];
  }, this);
});

Pagelets.get('length', function length() {
  return this.pagelets.length;
});

/**
 * Return the names of all pagelets on the stack.
 *
 * @param  {[type]}
 * @return {[type]}   [description]
 */
Pagelets.get('names', function names() {
  return Object.keys(this.pagelets);
});

/**
 * Destroy the collection and remove references so it can be safely
 * garbage collected.
 *
 * @api public
 */
Pagelets.readable('destroy', destroy([
  'pagelets',
], {
  after: 'removeAllListeners'
}));

function each(Pagelets, fn, context) {
  if (!Array.isArray(Pagelets)) Pagelets = [Pagelets];

  Pagelets.forEach(fn, context);
}

//
// Export the constructor.
//
module.exports = Pagelets;