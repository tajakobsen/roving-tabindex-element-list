import { __, contains, equals, useWith, identity, dec, complement, or } from 'ramda';
import keyCode from '../key-code';

/**
 * Returns true if the keyCode corresponds with the UP or LEFT arrow keys
 * @param {number} which
 *
 * @return {boolean}
 */
const isUpOrLeftKey = contains(__, [keyCode.UP_ARROW, keyCode.LEFT_ARROW]);

/**
 * Returns true if the keyCode corresponds with the DOWN or RIGHT arrow keys
 * @param {number} which
 *
 * @return {boolean}
 */
const isDownOrRightKey = contains(__, [keyCode.DOWN_ARROW, keyCode.RIGHT_ARROW]);

/**
 * Returns true if the index passed in is the first (0)
 * @param {number} index
 *
 * @return {boolean}
 */
const isFirstIndex = equals(0);

/**
 * Returns true if the index passed in is the last
 * @param {number} index
 * @param {number} size
 *
 * @return {boolean}
 */
const isLastIndex = useWith(equals, [identity, dec]);

/**
 * Returns true keypress is up/left while on first element
 * or if keypress is down/right when on last element
 * @param {object} event
 * @param {Element[]} event.elements
 * @param {NavigationListState} event.state
 * @param {string} event.which
 *
 * @return {boolean}
 */
export const willWrapAround = ({ elements, state, which }) => {
  const isUpFromFirst = isUpOrLeftKey(which)
    && isFirstIndex(state.currentIndex);

  const isDownFromLast = isDownOrRightKey(which)
    && isLastIndex(state.currentIndex, elements.length);

  return or(isUpFromFirst, isDownFromLast);
};

/**
 * Plugin that sorts the elements by dom position before applying a new state
 * @class
 * @implements {NavigationListPlugin}
 */
export default class PreventWrappingPlugin {
  /**
   * Initiates the plugin
   * @param {NavigationList} navigationList
   */
  // eslint-disable-next-line class-methods-use-this
  init(navigationList) {
    // returns false, if the index will wrap around
    navigationList.on('beforeUpdateState', complement(willWrapAround));
  }
}
