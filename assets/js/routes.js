(function() {
  app.constant('loginRedirectPath', '/login');
  app.config(function($stateProvider, $urlRouterProvider) {


    var requireAuth = {
      "currentAuth": ["Auth", function(Auth) {
        return Auth.$requireAuth();
      }]
    };

    $urlRouterProvider.otherwise('/');

    $stateProvider

      // DASHBOARD
      .state('dashboard', {
          url: '/',
          templateUrl: 'templates/dashboard.html',
          controller: 'dashboardController',
          resolve: requireAuth
      })

      // CREATE + EDIT + DELETE
      .state('edit', {
          url: '/edit',
          templateUrl: 'templates/edit.html',
          controller: 'editConferenceController',
          resolve: requireAuth
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
          controller: 'settingsController',
          resolve: requireAuth
      })

      // TALK
      .state('talk', {
          url: '/talk',
          templateUrl: 'templates/talk.html',
          controller: 'talkController',
          resolve: requireAuth
      })

      // TRACK
      .state('track', {
          url: '/track',
          templateUrl: 'templates/track.html',
          controller: 'trackController',
          resolve: requireAuth
      })

  });
}).call(this);
