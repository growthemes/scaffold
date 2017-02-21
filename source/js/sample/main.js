goog.module('bootstrap');

const mainComponent = goog.require('app.MainComponent');
const mainController = goog.require('app.MainController');
const peopleService = goog.require('app.PeopleService');

function bootstrap() {
  angular.module('app', [])
    .component(mainComponent.selector, mainComponent.definition)
    .controller(mainController.name, mainController.definition)
    .service(peopleService.name, peopleService.definition)
    .config(['$compileProvider', '$interpolateProvider',
        function($compileProvider, $interpolateProvider) {

      // Disable debug info in production
      if (/localhost/.test(window.location.host) === false) {
        $compileProvider.debugInfoEnabled(false);
      }

      $interpolateProvider.startSymbol('{[');
      $interpolateProvider.endSymbol(']}');
    }])

  angular.bootstrap(document, ['app']);
};

goog.exportSymbol('app.bootstrap', bootstrap);
