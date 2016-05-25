(function() {
  window.app = angular.module("cono", ["firebase", "ui.router"]);
  window.fbRef = new Firebase("cono-app.firebaseio.com");

  app.config(function($stateProvider, $urlRouterProvider) {



    $urlRouterProvider.otherwise('/');

    $stateProvider

      // DASHBOARD
      .state('dashboard', {
          url: '/',
          templateUrl: 'templates/dashboard.html',
          controller: 'dashboardController'
      })

      // CREATE + EDIT + DELETE
      .state('edit', {
          url: '/edit',
          templateUrl: 'templates/edit.html',
          controller: 'editConferenceController'
      })

      // LOGIN & REGISTRATION
      .state('login', {
          url: '/login',
          templateUrl: 'templates/login.html',
          controller: 'authController'
      })

      // SETTINGS
      .state('settings', {
          url: '/settings',
          templateUrl: 'templates/settings.html',
          controller: 'settingsController'
      })

      // TALK
      .state('talk', {
          url: '/talk',
          templateUrl: 'templates/talk.html',
          controller: 'talkController'
      })

      // TRACK
      .state('track', {
          url: '/track',
          templateUrl: 'templates/track.html',
          controller: 'trackController'
      })

  });
}).call(this);
