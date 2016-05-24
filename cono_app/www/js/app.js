// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var firebaseUrl = "https://cono-app.firebaseio.com/";
var starter = angular.module('starter', ['ionic', 'firebase'])

  .factory("Auth", ["$firebaseAuth", "$rootScope",
      function ($firebaseAuth, $rootScope) {
          
          var ref = new Firebase(firebaseUrl);
          return $firebaseAuth(ref);
      }])

  .run(function ($ionicPlatform, $rootScope, Auth) {
      $ionicPlatform.ready(function () {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          if (window.cordova && window.cordova.plugins.Keyboard) {
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
              cordova.plugins.Keyboard.disableScroll(true);

          }
          if (window.StatusBar) {
              // org.apache.cordova.statusbar required
              StatusBar.styleDefault();
          }

      });
       //stateChange event
       $rootScope.auth = Auth;
       $rootScope.auth.$onAuth(function(authData, toState) {
       if (authData) {
       console.log("Logged in as:", authData.uid);
       } else {
       console.log("Logged out");
       }
       });
  })

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider               
            .state('login', {
                url: '/',
                templateUrl: 'templates/login.html'
            })
            
            .state('app', {
                resolve: {
                    // controller will not be loaded until $requireAuth resolves
                    // Auth refers to our $firebaseAuth wrapper in the example above
                    "currentAuth": ["Auth", function (Auth) {
                            // $requireAuth returns a promise so the resolve waits for it to complete
                            // If the promise is rejected, it will throw a $stateChangeError (see above)
                            return Auth.$requireAuth();
                        }]
                },
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'SessionCtrl'
            })
            
            .state('app.index', {
                
                url: '/index',
                views: {
                    'menuContent': {
                        templateUrl: 'index.html'
                    }
                }
            })

            .state('app.search', {
                url: '/search',
                views: {
                  'menuContent': {
                    templateUrl: 'templates/search.html'
                  }
                }
              })

            .state('app.test', {
                url: '/test',
                views: {
                  'menuContent': {
                    templateUrl: 'templates/test.html'
                  }
                }
              })

              .state('app.test2', {
                url: '/test2',
                views: {
                  'menuContent': {
                    templateUrl: 'templates/test2.html'
                  }
                }
              });              

            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/search');
          });
