goog.module('app.MainComponent');

/**
 * @type {!angular.ComponentController}
 */
const controller = goog.defineClass(null, {

  /** @ngInject */
  constructor: function(PeopleService) {

    /** @private */
    this.peopleService_ = PeopleService;

    /** @export {boolean} */
    this.loading = false;

    /** @export {string} */
    this.title = 'Main';

    /** @export {Date} */
    this.date = new Date();

    /** @export {string} */
    this.dateString = '';

    /** @export {Array<app.Person>} */
    this.list = [];

    /**
     * Normalized locale code for Date#toLocaleString() 
     * @private {string} 
     */
    this.lang_ = document
      .querySelector('html')
      .getAttribute('lang')
      .replace('_', '-')
      .toLowerCase();
  },

  /**
   * Sets the formatted string of the chosen date.
   * @export
   */
  pickTime() {
    if (!this.date) {
      return;
    }

    this.dateString = this.date.toLocaleString(this.lang_);
  },

  /**
   * Simulates an async call with fat arrow assignment.
   * @export
   */
  showPeople() {
    this.loading = true;

    this.peopleService_.getList()
      .then(results => {
        this.list = results;
      })
      .finally(() => {
        this.loading = false;
      })
  }
});

/**
 * @type {!angular.Component}
 */
const componentDef = {
  controller: controller,
  template: `
  Sample Component:
  <h2>{[ $ctrl.title ]}</h2>
  <input type="date" ng-model="$ctrl.date" ng-change="$ctrl.pickTime()" />
  <p>{[ $ctrl.dateString ]}</p>
  <hr />
  <button ng-click="$ctrl.showPeople()">Get list</button>
  <small ng-if="$ctrl.loading === true">Loading...</small>
  <pre>
{[ $ctrl.list | json ]}
  </pre>
  `
};

exports = {
  selector: 'appMain',
  definition: componentDef
}
