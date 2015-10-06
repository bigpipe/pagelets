'use strict';

var destroy = require('demolish')
  , fuse = require('fusing');

/**
 * Generate a collection of pagelets that can be re-used in different routes.
 *
 * @Constructor
 * @param {Array} pagelets collection of Pagelet constructors
 * @api public
 */
function Pagelets(pagelets, options) {
  options = options || {};

  this.fuse();

  //
  // Properties that will be added to each pagelet.
  //
  this.readable('root', options.root);
  this.readable('pagelets', {});

  this.add(pagelets);
}

//
// Provide eventemitter capacity.
//
fuse(Pagelets, require('eventemitter3'));

/**
 * Remove the provide Pagelets from the collection.
 *
 * @param {Array} Pagelets Set of names or Pagelet constructors.
 * @api public
 */
Pagelets.readable('add', function add(Pagelets) {
  each(Pagelets, function each(Pagelet) {
    if (this.routesot) Pagelet = Pagelet.extend(this.root);

    this.pagelets[Pagelet.prototype.name] = Pagelet;
  }, this);
});

/**
 * Remove the provide Pagelets from the collection.
 *
 * @param {Array} Pagelets Set of names or Pagelet constructors.
 * @api public
 */
Pagelets.readable('remove', function remove(Pagelets) {
  each(Pagelets, function each(Pagelet) {
    if ('object' === typeof Pagelet) Pagelet = Pagelet.prototype.name;

    delete this.pagelets[Pagelet];
  }, this);
});

/**
 * Return the number of pagelets in the collection.
 *
 * @return {Number} Length of collection.
 * @api public
 */
Pagelets.get('length', function length() {
  return this.names.length;
});

/**
 * Return the names of all pagelets on the stack.
 *
 * @return {Array} Object properties of all pagelets
 * @api public
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

/**
 * Iterator helper.
 *
 * @param {Mixed|Array} Pagelets Collection of pagelets.
 * @param {Function} fn iterator.
 * @param {Object} context Run iterator in this context.
 * @api public
 */
function each(Pagelets, fn, context) {
  if (!Array.isArray(Pagelets)) Pagelets = [Pagelets];

  Pagelets.forEach(fn, context);
}

//
// Export the constructor.
//
module.exports = Pagelets;