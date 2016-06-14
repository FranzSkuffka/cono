(function() {
  app.constant('loginRedirectPath', '/login');
  app.config(function($stateProvider, $urlRouterProvider) {


    var requireAuth = {
      "currentAuth": ["Auth", function(Auth) {
        var required = Auth.$requireAuth()
        required.catch(function (auth, a, b) {
          window.location = '/#/login'
        })
        return required;
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


//
//    EDIT VIEWS
//    /#/edit/
//

      // CREATE CONFERENCE
        .state('new', {
            url: '/edit/',
            templateUrl: 'templates/editConference.html',
            controller: 'editConferenceController',
            resolve: requireAuth
        })

      // UPDATE OR DELETE CONFERENCE
      .state('edit', {
          url: '/edit/:slug/:id',
          templateUrl: 'templates/editConference.html',
          controller: 'editConferenceController',
          resolve: requireAuth
      })


      .state('editTalk', {
          url: '/edit/talk/:id/:conferenceName/:conferenceId',
          templateUrl: 'templates/editTalk.html',
          controller: 'editTalkController',
          resolve: requireAuth
      })



      // TRACK
      .state('editTrack', {
          url: '/edit/track/:trackId',
          templateUrl: 'templates/editTrack.html',
          controller: 'editTrackController',
          resolve: requireAuth
      })




// 
// AUTHENTICATION
// /#/login
// 
      // LOGIN
      .state('login', {
          url: '/login',
          templateUrl: 'templates/login.html',
          controller: 'authController'
      })
      // LOGOUT
      .state('logout', {
          url: '/logout',
          templateUrl: 'templates/login.html',
          controller: 'authController'
      })

// 
// ACCOUNT MANAGMENT
// /#/register
//
      // REGISTRATION
      .state('register', {
          url: '/register',
          templateUrl: 'templates/register.html',
          controller: 'registrationController'
      })

      // REGISTRATION
      .state('forgotPassword', {
          url: '/forgotPassword',
          templateUrl: 'templates/forgotPassword.html',
          controller: 'registrationController'
      })

      // SETTINGS
      .state('settings', {
          url: '/settings',
          templateUrl: 'templates/settings.html',
          controller: 'settingsController',
          resolve: requireAuth
      })
  });

}).call(this);
