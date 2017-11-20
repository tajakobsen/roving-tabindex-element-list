import { equals, without } from 'ramda';
import { first, last, prev, next } from './operations';
import Eventful from './mixins/eventful';
import keyCode from './key-code';

/**
 * @interface NavigationListPlugin
 * @property {function(NavigationList)} init
 */

/**
 * Toggles tabindex
 * @param {Element} element
 * @param {boolean} isTabbable
 */
const toggleTabIndex = (element, isTabbable) => element.setAttribute('tabindex', isTabbable ? '0' : '-1');

/** @const {object<string, function>} Map of key codes to operations */
const operations = {
  [keyCode.HOME]: first,
  [keyCode.END]: last,
  [keyCode.UP_ARROW]: prev,
  [keyCode.LEFT_ARROW]: prev,
  [keyCode.DOWN_ARROW]: next,
  [keyCode.RIGHT_ARROW]: next,
};

/**
 * @typedef {object} NavigationListState
 * @property {number} currentIndex
 * @mixes Eventful
 */
export default class NavigationList {
  /**
   * @constructor
   * @mixes Eventful
   * @param {NavigationListPlugin[]} [plugins]
   */
  constructor({ plugins = [] } = {}) {
    // add event system
    Object.assign(this, Eventful());

    // initiates the plugins
    plugins.forEach(plugin => plugin.init(this));

    /**
     * @type {Array.<Element|EventTarget>}
     */
    this.elements = [];

    /**
     * @type {NavigationListState}
     */
    this.state = {
      currentIndex: 0,
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

  /**
   * Registers an element with the navigation list
   *
   * @param {Element} element
   */
  registerElement(element) {
    this.elements.push(element);
    const index = this.elements.length - 1;

    element.addEventListener('keydown', this.boundHandleKeydown);
    element.addEventListener('click', this.boundHandleClick);
    toggleTabIndex(element, equals(this.state.currentIndex, index));
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
   * @param {KeyboardEvent} keyboardEvent
   */
  handleKeyDown(keyboardEvent) {
    const operation = operations[keyboardEvent.which];
    const event = this.createEventPayload({ which: keyboardEvent.which });

    if (operation && this.fire('beforeUpdateState', event) !== false) {
      this.updateState(operation);
      keyboardEvent.preventDefault();
    }
  }

  /**
   * Updates the state
   * @param {function(number, number) : number} operation
   */
  updateState(operation) {
    this.state.currentIndex = operation(this.state.currentIndex, this.elements.length);
    this.applyState(this.state, this.elements);
    this.getCurrentlySelectedElement().focus();
    this.fire('stateUpdated', this.createEventPayload());
  }

  /**
   * Creates an object to be used as event payload
   * @param {Object} [event]
   *
   * @returns {Object}
   */
  createEventPayload(event) {
    return Object.assign({
      elements: this.elements,
      state: this.state,
    }, event);
  }

  /**
   * Returns the currently selected element
   *
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
  // eslint-disable-next-line class-methods-use-this
  applyState(state, elements) {
    elements.forEach((element, index) => {
      const isCurrent = equals(state.currentIndex, index);
      toggleTabIndex(element, isCurrent);
    });
  }
}
