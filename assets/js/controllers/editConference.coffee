app.controller 'editConferenceController', ($scope, $rootScope, $firebaseArray, $stateParams, $location, Auth, cloudinary, $state) ->

  window.cloudinary = cloudinary
  #///////////////////////////////////////
  # BIND UI WIDGETS

  bindUiWidgets = ->
    $('.tabs').tabs()
    delay(1000)(-> $('.materialize-colorpicker').colorpicker(component: '.btn'))

  #///////////////////////////////////////
  # UTILITIES TO SCOPE
  $scope.state = $stateParams
  $scope.toast = Materialize.toast
  #/////////////////////////////////////////
  #/////////////////////////////////////////
  # DATABASE BINDINGS
  #
  # set up references
  conferencesRef = fbRef.child('conferences')
  #///////
  # BIND TALKS

  bindTalksAndTracks = ->
    $scope.talks = $firebaseArray(fbRef.child('talks').orderByChild('conferenceId').equalTo($stateParams.id))
    # bind material ui
    $scope.$watch 'talks', (data) ->
      $('.TalkList').collapsible()
      return
    # create add talk method

    $scope.addTalk = ->
      $scope.talks.$add(entryTemplates.newTalk($stateParams.id, $scope.conference)).then (talk) ->
        path = '/edit/talk/' + talk.key() + '/' + $stateParams.slug + '/' + $stateParams.id
        $location.path path
        return
      return

    #///////
    # BIND TRACKS
    $scope.tracks = $firebaseArray(fbRef.child('tracks').orderByChild('conferenceId').equalTo($stateParams.id))
    $scope.$watch 'tracks', (data) ->
      $('.TrackList').collapsible()
      return
    # create add track method

    $scope.addTrack = ->
      $scope.tracks.$add entryTemplates.newTrack($stateParams, $scope)
      return

    return

  # LOAD CONFERENCE FROM DATABASE
  # if there is an ID given through the path, try to load from ID
  # otherwise or if it fails, load the new conference templte
  conferenceRef = null
  if $stateParams.id
    conferenceRef = fbRef.child('conferences/').child($stateParams.id)
    conferenceRef.once 'value', (snapshot) ->
      if snapshot.val() != null
        conference = snapshot.val()
        conference.start = new Date(conference.start * 1000)
        conference.end = new Date(conference.end * 1000)
        $scope.conference = conference
        $scope.conferenceRef = true
        # BIND CHILDREN
        bindTalksAndTracks()
        # save db entry id for saving
        try
          # lil hack i'm lazy right now
          # and this whole thing is a hack anyways
          $scope.$digest()
        catch e
        bindUiWidgets()
      else
        $state.go 'dashboard'
      return
  else
    $state.go 'dashboard'
  # SAVE CONFERENCE
  # decide if update or delete


  $scope.save = ->
    conferenceToUpdate = clone($scope.conference)
    Materialize.toast 'Konferenz gespeichert.', 1000
    conferenceToUpdate.start = new Date(conferenceToUpdate.start).getUnixTime()
    conferenceToUpdate.end = new Date(conferenceToUpdate.end).getUnixTime()
    conferenceToUpdate.corporateidentity.color = hexify $('input[name="color"]')[0].value
    conferenceRef.update conferenceToUpdate
    return

  # DELETE

  $scope.removeConference = ->
    conferenceRef.remove()
    $state.go 'dashboard'
    return

  # PUBLISH

  $scope.publish = ->
    $scope.conference.published = true
    Materialize.toast 'Konferenz veröffentlicht.', 1000, 'blue'
    conferenceRef.update published: true
    return

  # UNPUBLISH

  $scope.unpublish = ->
    $scope.conference.published = false
    Materialize.toast 'Konferenz versteckt.', 1000, 'grey'
    conferenceRef.update published: false
    return

  window.onbeforeunload = -> $scope.save()

  $scope.$on "$locationChangeStart", window.onbeforeunload

return
