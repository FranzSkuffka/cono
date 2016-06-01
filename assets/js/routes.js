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
        .state('new', {
            url: '/edit/',
            templateUrl: 'templates/editConference.html',
            controller: 'editConferenceController',
            resolve: requireAuth
        })


      // CREATE + EDIT + DELETE
      .state('edit', {
          url: '/edit/:slug/:id',
          templateUrl: 'templates/editConference.html',
          controller: 'editConferenceController',
          views: {
              header: {
                  templateUrl: 'templates/headers/nav-logo.html',
                  controller: function($scope) {}
              },
              content: {
                  templateUrl: 'templates/dashboard/application/applications-title.html',
                  controller: function($scope) {}
              }
          },
          resolve: requireAuth
      })

      // LOGIN
      .state('login', {
          url: '/login',
          templateUrl: 'templates/login.html',
          controller: 'authController',
          views: {
              header: {
                  templateUrl: 'templates/headers/nav-logo.html',
                  controller: function($scope) {}
              },
              content: {
                  templateUrl: 'templates/dashboard/application/applications-title.html',
                  controller: function($scope) {}
              }
          }
      })

      // REGISTRATION
      .state('register', {
          url: '/register',
          templateUrl: 'templates/register.html',
          controller: 'registrationController',
          views: {
              header: {
                  templateUrl: 'templates/headers/nav-logo.html',
                  controller: function($scope) {}
              },
              content: {
                  templateUrl: 'templates/dashboard/application/applications-title.html',
                  controller: function($scope) {}
              }
          }
      })

      // REGISTRATION
      .state('forgotPassword', {
          url: '/forgotPassword',
          templateUrl: 'templates/forgotPassword.html',
          controller: 'registrationController',
          views: {
              header: {
                  templateUrl: 'templates/headers/nav-logo.html',
                  controller: function($scope) {}
              },
              content: {
                  templateUrl: 'templates/dashboard/application/applications-title.html',
                  controller: function($scope) {}
              }
          }
      })

      // SETTINGS
      .state('settings', {
          url: '/settings',
          templateUrl: 'templates/settings.html',
          controller: 'settingsController',
          views: {
              header: {
                  templateUrl: 'templates/headers/nav-logo.html',
                  controller: function($scope) {}
              },
              content: {
                  templateUrl: 'templates/dashboard/application/applications-title.html',
                  controller: function($scope) {}
              }
          },
          resolve: requireAuth
      })

      // TALK
      .state('talk', {
          url: '/talk',
          templateUrl: 'templates/talk.html',
          controller: 'talkController',
          views: {
              header: {
                  templateUrl: 'templates/headers/nav-logo.html',
                  controller: function($scope) {}
              },
              content: {
                  templateUrl: 'templates/dashboard/application/applications-title.html',
                  controller: function($scope) {}
              }
          },
          resolve: requireAuth
      })

      // TRACK
      .state('track', {
          url: '/track',
          templateUrl: 'templates/track.html',
          controller: 'trackController',
          views: {
              header: {
                  templateUrl: 'templates/headers/nav-logo.html',
                  controller: function($scope) {}
              },
              content: {
                  templateUrl: 'templates/dashboard/application/applications-title.html',
                  controller: function($scope) {}
              }
          },
          resolve: requireAuth
      })

  });
}).call(this);
