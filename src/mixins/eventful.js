const Eventful = () => /** @mixin Eventful */ ({
  /**
   * @property {object.<string, Trigger>}
   */
  listeners: {},

  /**
   * Listen to event
   * @memberOf Eventful
   * @param {string} type
   * @param {function} listener
   * @param {object} [scope]
   *
   * @return {Eventful}
   */
  on(type, listener, scope) {
    /**
     * @typedef {object} Trigger
     * @property {function} listener
     * @property {object} scope
     */
    const trigger = {
      listener,
      scope,
    };

    this.listeners[type] = this.listeners[type] || [];
    this.listeners[type].push(trigger);

    return this;
  },

  /**
   * Fire event. If any of the listeners returns false, return false
   * @memberOf Eventful#
   * @param {string} type
   * @param {object} [event]
   *
   * @return {boolean}
   */
  fire(type, event) {
    const triggers = this.listeners[type] || [];
    return triggers.every(trigger => this.callTrigger(trigger, event) !== false);
  },

  /**
   * Calls the listener of a single trigger
   * @param {Trigger} trigger
   * @param {object} [event]
   *
   * @returns {boolean}
   */
  callTrigger(trigger, event) {
    return trigger.listener.call(trigger.scope || this, event);
  },

  /**
   * Listens for events on another Eventful, and propagate it trough this Eventful
   *
   * @param {string[]} types
   * @param {Eventful} eventful
   */
  propagate(types, eventful) {
    types.forEach(type => eventful.on(type, event => this.fire(type, event)));
  },
});

export default Eventful;
