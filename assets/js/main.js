(function() {
  window.app = angular.module("cono", ["firebase", "ui.router", "datetime"]);
  window.fbRef = new Firebase("cono-app.firebaseio.com");
  app.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
    return $firebaseAuth(fbRef);
  }]);
}).call(this);
