(function() {
  window.app = angular.module("cono", ["firebase", "ui.router"]);
  window.fbRef = new Firebase("cono-app.firebaseio.com");
  app.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
    return $firebaseAuth(fbRef);
  }]);
  
  $(".dropdown-button").dropdown();
}).call(this);
