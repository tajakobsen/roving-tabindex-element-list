import test from 'ava';
import { willWrapAround } from '../../src/plugins/prevent-wrapping';
import keyCode from '../../src/key-code';

const first = document.createElement('div');
const middle = document.createElement('div');
const last = document.createElement('div');

const elements = [first, middle, last];

/**
 * Creates params for 'willWrapAround'
 * @param {Element} currentElement
 * @param {number} which
 */
const createParams = (currentElement, which) => ({
  elements,
  which,
  state: {
    currentIndex: elements.indexOf(currentElement),
  },
});

/* Test first element */
test('up arrow on first element', (t) => {
  t.true(willWrapAround(createParams(first, keyCode.UP_ARROW)));
});

test('right arrow on first element', (t) => {
  t.false(willWrapAround(createParams(first, keyCode.RIGHT_ARROW)));
});

test('down arrow on first element', (t) => {
  t.false(willWrapAround(createParams(first, keyCode.DOWN_ARROW)));
});

test('left arrow on first element', (t) => {
  t.true(willWrapAround(createParams(first, keyCode.LEFT_ARROW)));
});

/* Test middle element */
test('up arrow on middle element', (t) => {
  t.false(willWrapAround(createParams(middle, keyCode.UP_ARROW)));
});

test('right arrow on middle element', (t) => {
  t.false(willWrapAround(createParams(middle, keyCode.RIGHT_ARROW)));
});

test('down arrow on middle element', (t) => {
  t.false(willWrapAround(createParams(middle, keyCode.DOWN_ARROW)));
});

test('left arrow on middle element', (t) => {
  t.false(willWrapAround(createParams(middle, keyCode.LEFT_ARROW)));
});

/* Test last element */
test('up arrow on last element', (t) => {
  t.false(willWrapAround(createParams(last, keyCode.UP_ARROW)));
});

test('right arrow on last element', (t) => {
  t.true(willWrapAround(createParams(last, keyCode.RIGHT_ARROW)));
});

test('down arrow on last element', (t) => {
  t.true(willWrapAround(createParams(last, keyCode.DOWN_ARROW)));
});

test('left arrow on last element', (t) => {
  t.false(willWrapAround(createParams(last, keyCode.LEFT_ARROW)));
});
