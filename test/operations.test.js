import test from 'ava';
import { next, prev, last, first } from '../src/operations';

const ELEMENTS_LENGTH = 3;

test('next', t => {
  t.is(next(0, ELEMENTS_LENGTH), 1);
  t.is(next(1, ELEMENTS_LENGTH), 2);
  t.is(next(2, ELEMENTS_LENGTH), 0);
});

test('prev', t => {
  t.is(prev(1, ELEMENTS_LENGTH), 0);
  t.is(prev(2, ELEMENTS_LENGTH), 1);
  t.is(prev(0, ELEMENTS_LENGTH), 2);
});

test('first', t => {
  t.is(first(2, ELEMENTS_LENGTH), 0);
});

test('last', t => {
  t.is(last(0, ELEMENTS_LENGTH), 2);
});

