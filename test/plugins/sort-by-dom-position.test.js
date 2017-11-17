import test from 'ava';
import { sortElementsByDomPosition } from '../../src/plugins/sort-by-dom-position';

let element1;
let element2;
let element3;

// reset before each test
test.beforeEach(() => {
  element1 = document.createElement('div');
  element2 = document.createElement('div');
  element3 = document.createElement('div');

  // insert the elements in the body
  document.body.innerHTML = '';
  document.body.appendChild(element1);
  document.body.appendChild(element2);
  document.body.appendChild(element3);
});


test('sort elements by dom position', (t) => {
  // order list backwards compared to dom
  const elements = [element3, element2, element1];
  const state = { currentIndex: 0 };

  sortElementsByDomPosition({ elements, state });

  t.is(elements[0], element1);
  t.is(elements[1], element2);
  t.is(elements[2], element3);
  t.is(state.currentIndex, 2);
});
