'use strict';

var test = require('tape');
var mockProperty = require('mock-property');

var hasOwn = require('../');

test('hasOwn', function (t) {
	t.equal(typeof hasOwn, 'function', 'is a function');

	t['throws'](
		// @ts-expect-error
		function () { hasOwn(); },
		TypeError,
		'no arguments, throws'
	);
	t['throws'](
		function () { hasOwn(undefined, ''); },
		TypeError,
		'undefined throws'
	);
	t['throws'](
		function () { hasOwn(null, ''); },
		TypeError,
		'null throws'
	);

	t.equal(
		hasOwn({}, 'toString'),
		false,
		'toString is not an own property of a normal object'
	);

	t.equal(
		hasOwn({ toString: true }, 'toString'),
		true,
		'toString as an own property is an own property'
	);

	t.equal(
		hasOwn({ a: true }, 'a'),
		true,
		'a normal own property is an own property'
	);

	t.equal(hasOwn([], 'length'), true, 'an array length is an own property');
	t.equal(hasOwn('', 'length'), true, 'a string length is an own property');

	t.test('without a `.call`', function (st) {
		var restore = mockProperty(Function.prototype, 'call', { 'delete': true });
		st.teardown(restore);

		var toS = hasOwn({ toString: true }, 'toString');
		var ownA = hasOwn({ a: true }, 'a');
		var arrL = hasOwn([], 'length');
		var strL = hasOwn('', 'length');

		restore(); // TODO: remove this line once node is fixed

		st.equal(toS, true, 'no call; toString as an own property is an own property');
		st.equal(ownA, true, 'no call; a normal own property is an own property');
		st.equal(arrL, true, 'no call; an array length is an own property');
		st.equal(strL, true, 'no call; a string length is an own property');

		st.end();
	});

	t.end();
});
