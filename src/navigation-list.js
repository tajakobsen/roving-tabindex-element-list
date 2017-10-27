import { equals, without, invoker } from 'ramda';
import { first, last, prev, next } from './operations';
import keyCode from './key-code';

/**
 * Toggles tabindex
 * @param {Element} element
 * @param {boolean} isTabbable
 */
const toggleTabindex = (element, isTabbable) => element.setAttribute('tabindex', isTabbable ? '0' : '-1');


/**
 * Calls compareDocumentPosition on two elements
 *
 * @param {Element} a
 * @param {Element} b
 * @return {number}
 */
const compareDocumentPosition = invoker(1, 'compareDocumentPosition');

/**
 * @const Map of key codes to operations
 */
const operations = {
  [keyCode.HOME]: first,
  [keyCode.END]: last,
  [keyCode.UP_ARROW]: prev,
  [keyCode.LEFT_ARROW]: prev,
  [keyCode.DOWN_ARROW]: next,
  [keyCode.RIGHT_ARROW]: next
};

/**
 * @typedef {object} NavigationListState
 * @property {number} currentIndex
 */

export default class NavigationList {
  /**
   * @constructor
   * @param {boolean} [sortBeforeUpdate]
   */
  constructor({ sortBeforeUpdate = false } = {}) {
    this.sortBeforeUpdate = sortBeforeUpdate;

    /**
     * @type {Element[]}
     */
    this.elements = [];
    /**
     * @type {NavigationListState}
     */
    this.state = {
      currentIndex: 0
    };

    /**
     * @type {function}
     */
    this.boundHandleKeydown = this.handleKeyDown.bind(this);
    /**
     * @type {function}
     */
    this.boundHandleClick = this.handleClick.bind(this);
  }

  registerElement(element) {
    this.elements.push(element);
    const index =  this.elements.length - 1;

    element.addEventListener('keydown', this.boundHandleKeydown);
    element.addEventListener('click', this.boundHandleClick);
    toggleTabindex(element, equals(this.state.currentIndex, index));
  }

  /**
   * Removes keyboard support from an element
   * @param {HTMLElement} element
   */
  unregisterElement(element) {
    element.removeEventListener('keydown', this.boundHandleKeydown);
    element.removeEventListener('click', this.boundHandleClick);
    this.elements = without(element, this.elements);
  }

  /**
   * Moves the current selected to the clicked element
   * @param {MouseEvent} e
   */
  handleClick(e) {
    this.state.currentIndex = this.elements.indexOf(e.currentTarget);
    this.applyState(this.state, this.elements);
  }

  /**
   * Find the operation to perform to update the state
   * @param {KeyboardEvent} e
   */
  handleKeyDown(e) {
    const operation = operations[e.which];

    if (operation) {
      this.updateState(operation);
      e.preventDefault();
    }
  }

  /**
   * Returns the list of elements
   * @return {Element[]}
   */
  getElements() {
    return this.elements;
  }

  /**
   * Updates the state
   *
   * @param {function(number, number) : number} operation
   */
  updateState(operation) {
    if (this.sortBeforeUpdate) {
      this.sortElementsByDomPosition();
    }

    this.state.currentIndex = operation(this.state.currentIndex, this.elements.length);
    this.applyState(this.state, this.elements);
    this.getCurrentlySelectedElement().focus();
  }

  /**
   * Sorts the elements by position in dom
   * Note that this function uses the bitwise operator (&) on purpose
   */
  sortElementsByDomPosition() {
    const current = this.getCurrentlySelectedElement();
    this.elements.sort((a, b) => a.compareDocumentPosition(b) & 2 ? 1 : -1);
    this.state.currentIndex = this.elements.indexOf(current);
  }

  /**
   * Returns the currently selected element
   * @return {Element}
   */
  getCurrentlySelectedElement() {
    return this.elements[this.state.currentIndex];
  }

  /**
   * Applies the state to a list of elements
   *
   * @param {NavigationListState} state
   * @param {Element[]} elements
   */
  applyState(state, elements) {
    elements.forEach((element, index) => {
      const isCurrent = equals(state.currentIndex, index);
      toggleTabindex(element, isCurrent);
    })
  }
}