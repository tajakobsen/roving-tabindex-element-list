import { inc, dec, mathMod, useWith, identity} from 'ramda';

/**
 * Next index that wraps around
 *
 * @param {number} currentIndex
 * @param {number} size
 *
 * @return {number}
 */
export const next = useWith(mathMod, [inc, identity]);

/**
 * Previous index that wraps around
 *
 * @param {number} currentIndex
 * @param {number} size
 *
 * @return {number}
 */
export const prev = useWith(mathMod, [dec, identity]);

/**
 * Returns the first index
 *
 * @param {number} currentIndex
 * @param {number} size
 *
 * @return {number}
 */
export const first = (currentIndex, size) => 0;


/**
 * Previous index that wraps around
 *
 * @param {number} currentIndex
 * @param {number} size
 *
 * @return {number}
 */
export const last = (currentIndex, size) => dec(size);