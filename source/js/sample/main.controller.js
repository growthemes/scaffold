goog.module('app.MainController');

/**
 * @type {!angular.$controller}
 */
const controller = goog.defineClass(null, {
  constructor() {
    /** @export {string} */
    this.text = '';
  },

  /**
   * @export
   * @param {string} value
   */
  sayHello(value) {
    alert(`Hello there, ${value}!`);
  }
});

exports = {
  name: 'MainController',
  definition: controller
}
