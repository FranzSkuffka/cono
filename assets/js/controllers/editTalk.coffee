app.controller 'editTalkController', ($scope, $rootScope, $firebaseArray, $stateParams, $location, Auth, cloudinary, $state) ->
  # UTILITY: MERGE DATE AND TIME
  #

  mergeTimestamp = (date, time) ->
    new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds())

  # LOAD TALK FROM DATABASE
  if $stateParams.id
    # add return link to scope
    returnPath = '/edit/' + $stateParams.conferenceName + '/' + $stateParams.conferenceId
    $scope.returnPath = '/#' + returnPath
    #///////
    # BIND TRACKS
    fbRef.child('tracks').orderByChild('conferenceId').equalTo($stateParams.conferenceId).once 'value', (snapshot) ->
      $scope.tracks = snapshot.val()
      setTimeout (->
        $('select').material_select()
        return
      ), 100
      return
    talksRef = fbRef.child('talks/')
    conferenceRef = fbRef.child('conferences/').child($stateParams.conferenceId)
    talkRef = talksRef.child($stateParams.id)
    talkRef.once 'value', (snapshot) ->
      if snapshot.val() != null
        talk = snapshot.val()
        # talk.date = new Date();
        talk.date = new Date(talk.start * 1000)
        talk.start = new Date(talk.start * 1000)
        talk.end = new Date(talk.end * 1000)
        $scope.talk = talk
        # save db entry id for saving
        try
          # lil hack i'm lazy right now
          # and this whole thing is a hack anyways
          $scope.$digest()
        catch e
        imageUpload cloudinary, (imageData) ->
          $scope.talk.speakerPicture = imageData
          try
            $scope.$digest()
          catch e
          return
      else
        talkRef = false
        imageUpload cloudinary, (imageData) ->
          $scope.talk.speakerPicture = imageData
          try
            $scope.$digest()
          catch e
          return
      return
  else
    $state.go 'dashboard'

  $scope.save = ->
    # combine date and times
    $scope.talk.start = mergeTimestamp($scope.talk.date, $scope.talk.start).getUnixTime()
    $scope.talk.end = mergeTimestamp($scope.talk.date, $scope.talk.end).getUnixTime()
    console.log $scope.talk.end
    # delete date property
    delete $scope.talk.date
    # delete date property
    talkRef.update $scope.talk
    Materialize.toast 'Talk gespeichert', 1000, 'green'
    return

  $scope.return = ->
    # go back to conference
    $location.path returnPath
    return

  $scope.new = ->
    # go back to conference
    Materialize.toast 'Neuer Talk wird erstellt', 1000, 'grey'
    conferenceRef.once 'value', (snapshot) ->
      conference = snapshot.val()
      newTalk = talksRef.push()
      newTalk.set entryTemplates.newTalk($stateParams.conferenceId, conference)
      newPath = '/edit/talk/' + newTalk.key() + '/' + $stateParams.conferenceName + '/' + $stateParams.conferenceId
      $location.path newPath
      return
    return

  firebaseRef = fbRef
  return
return
