app.controller 'editTalkController', ($scope, $rootScope, $firebaseArray, $stateParams, $location, Auth, cloudinary, $state) ->

  # LOAD TALK FROM DATABASE
  transformForView = $scope.$watch 'talk', (val) ->
    $scope.talk.start = $scope.talk.end = $scope.talk.date = new Date(val.start * 1000)
    transformForView()

  $scope.save = (opts) ->

    opts = {} if !opts?

    # combine date and times
    talkToSave = clone($scope.talk)
    talkToSave.start = mergeTimestamp(talkToSave.date, talkToSave.start).getUnixTime()
    talkToSave.end = mergeTimestamp(talkToSave.date, talkToSave.end).getUnixTime()

    # clean object to be saved
    for key of talkToSave
      if key == 'date'
        delete talkToSave[key]
      if key[0] == '$'
        delete talkToSave[key]

    fbRef.child('talks').child($scope.talk.$id).set(talkToSave)

    Materialize.toast 'Talk gespeichert', 1000, 'green' if !opts.silent

  window.onbeforeunload = (e) ->
    $scope.save({silent: true})

  $scope.$on "$locationChangeStart", window.onbeforeunload

return
