import test from 'ava';
import { equals } from 'ramda';
import NavigationList from '../src/navigation-list';
import keyCode from '../src/key-code'


let navigationList;
let element1;
let element2;
let element3;

/**
 * Creates a keyboard event for a given keyCode
 * @param {keyCode} which
 * @return {KeyboardEvent}
 */
const createKeyboardEvent = (which) => {
  return new KeyboardEvent("keydown", { bubbles : false, cancelable : true, which: which });
};

/**
 * Returns true if the element has tabindex="0"
 * @param {Element} element
 * @return {boolean}
 */
const hasTabIndex = element => element.getAttribute('tabindex') === '0';

/**
 * Checks that an element is the only one with tabindex="0"
 * @param {Element} element
 * @return {boolean}
 */
const isAloneWithTabIndex = (element) => {
  return equals(hasTabIndex(element1), element1 === element)
    && equals(hasTabIndex(element2), element2 === element)
    && equals(hasTabIndex(element3), element3 === element);
};

test.beforeEach(() => {
  navigationList = new NavigationList();

  element1 = document.createElement('div');
  element2 = document.createElement('div');
  element3 = document.createElement('div');

  navigationList.registerElement(element1);
  navigationList.registerElement(element2);
  navigationList.registerElement(element3);
});


test('create navigation list', (t) => {
  t.true(isAloneWithTabIndex(element1));
});


test('press down/right key', t => {
  element1.dispatchEvent(createKeyboardEvent(keyCode.DOWN_ARROW));
  t.true(isAloneWithTabIndex(element2));

  element2.dispatchEvent(createKeyboardEvent(keyCode.RIGHT_ARROW));
  t.true(isAloneWithTabIndex(element3));
});

test('press up/left key', t => {
  element1.dispatchEvent(createKeyboardEvent(keyCode.UP_ARROW));
  t.true(isAloneWithTabIndex(element3));

  element3.dispatchEvent(createKeyboardEvent(keyCode.LEFT_ARROW));
  t.true(isAloneWithTabIndex(element2));
});

test('press home key', t => {
  element1.dispatchEvent(createKeyboardEvent(keyCode.UP_ARROW));
  element1.dispatchEvent(createKeyboardEvent(keyCode.HOME));
  t.true(isAloneWithTabIndex(element1));
});

test('press end key', t => {
  element1.dispatchEvent(createKeyboardEvent(keyCode.DOWN_ARROW));
  element1.dispatchEvent(createKeyboardEvent(keyCode.END));
  t.true(isAloneWithTabIndex(element3));
});