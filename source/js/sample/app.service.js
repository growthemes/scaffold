goog.module('app.PeopleService');

/**
 * @typedef {{firstName: string, age: number}}
 */
app.Person;

const PeopleService = goog.defineClass(null, {
  /**
   * @ngInject
   * @param {!angular.$q} $q Promise service
   * @param {!angular.$timeout} $timeout Timeout service
   */
  constructor($q, $timeout) {
    this.q_ = $q;
    this.timeout_ = $timeout;

    /**
     * Sample results list of people.
     * @type {Array<app.Person>}
     * @private
     */
    this.result_ = [
      { 'firstName': 'John', 'age': 25 },
      { 'firstName': 'Sandra', 'age': 31 },
    ];
  },

  /**
   * @return {angular.$q.Promise<Array<app.Person>>}
   */
  getList() {
    const defer = this.q_.defer();
    this.timeout_(() => {
      defer.resolve(this.result_);
    }, 1000);
    return defer.promise;
  }
});

exports = {
  name: 'PeopleService',
  definition: PeopleService
}