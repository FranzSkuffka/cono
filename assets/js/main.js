(function() {
  window.app = angular.module("cono", ["firebase", "ui.router", "datetime", "angular-cloudinary"]);
  window.fbRef = new Firebase("cono-app.firebaseio.com");
  app.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
    return $firebaseAuth(fbRef);
  }]);

  Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };

}).call(this);
