app.controller 'editTalkController', ($scope, $rootScope, $firebaseArray, $stateParams, $location, Auth, cloudinary, $state) ->

  $scope.save = ($event) ->


    # combine date and times
    talkToSave = clone($scope.talk)
    talkToSave.start = mergeTimestamp(talkToSave.tempDate, talkToSave.tempStart) / 1000
    talkToSave.end = mergeTimestamp(talkToSave.tempDate, talkToSave.tempEnd) / 1000

    # clean object to be saved
    for key of talkToSave
      if key == 'date'
        delete talkToSave[key]
      if key[0] == '$'
        delete talkToSave[key]
      if key[0 .. 3] == 'temp'
        delete talkToSave[key]

    fbRef.child('talks').child($scope.talk.$id).set(talkToSave)

    # user feedback
    $event.toElement.parentElement.parentElement.parentElement.parentElement.children[0].click() if $event?
    Materialize.toast 'Talk gespeichert', 1000, 'green' if $event?
    $("html, body").animate({ scrollTop: 0 }, "slow")


  window.onbeforeunload = (e) ->
    $scope.save()

  $scope.$on "$locationChangeStart", window.onbeforeunload

return
