import { invoker, compose } from 'ramda';

/**
 * Calls compareDocumentPosition on two elements
 * @type {Function}
 * @param {Element} a
 * @param {Element} b
 *
 * @return {number}
 */
const compareDocumentPosition = invoker(1, 'compareDocumentPosition');

/**
 * Returns true if the bitmask contains the 2 bit set
 * @param {number} bitmask
 *
 * @return {boolean}
 */
const isPrecedingValue = bitmask => (bitmask & 2) > 0; // eslint-disable-line no-bitwise

/**
 * Returns the direction to move an element based on the isPreceding
 * @param {boolean} isPreceding
 *
 * @return {number}
 */
const moveDirection = isPreceding => (isPreceding ? -1 : 1);

/**
 * Returns 1 or -1 based on the element being before or after in the dom
 * @type {Function}
 * @param {Element} a
 * @param {Element} b
 *
 * @return {number}
 */
const sortByDomPosition = compose(moveDirection, isPrecedingValue, compareDocumentPosition);

/**
 * Performs a sort of the elements by dom position, and updates the state
 * with the new index of the currently selected item
 *
 * @param {Element[]} elements
 * @param {NavigationListState} state
 */
export const sortElementsByDomPosition = ({ elements, state }) => {
  const element = elements[state.currentIndex];
  elements.sort(sortByDomPosition);
  state.currentIndex = elements.indexOf(element); // eslint-disable-line no-param-reassign
};

/**
 * Plugin that sorts the elements by dom position before applying a new state
 * @class
 * @implements {NavigationListPlugin}
 */
export default class SortByDomPositionPlugin {
  /**
   * Initiates the plugin
   * @param {NavigationList} navigationList
   */
  // eslint-disable-next-line class-methods-use-this
  init(navigationList) {
    navigationList.on('beforeUpdateState', sortElementsByDomPosition);
  }
}
