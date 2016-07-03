app.controller 'editConferenceController', ($scope, $rootScope, $firebaseArray, $stateParams, $location, Auth, cloudinary, $state) ->

  window.cloudinary = cloudinary

  bindUiWidgets = ->
    $('.tabs').tabs()
    delay(1000)(-> $('.materialize-colorpicker').colorpicker(component: '.btn'))
    preloader.classList.remove "active"

  $scope.state = $stateParams
  $scope.toast = Materialize.toast

  conferencesRef = fbRef.child('conferences')

  bindTalksAndTracks = ->
    $scope.talks = $firebaseArray(fbRef.child('talks').orderByChild('conferenceId').equalTo($stateParams.id))
    $scope.tracks = $firebaseArray(fbRef.child('tracks').orderByChild('conferenceId').equalTo($stateParams.id))

    $scope.$watch 'talks', (data) ->
        $('.TalkList').collapsible()
        $('select').material_select()

        sorted = false
        for talk in data
          if !talk.tempStart? && !talk.tempEnd?
            talk.tempStart = talk.tempDate = new Date(talk.start * 1000)
            talk.tempEnd = new Date(talk.end * 1000)
          else
            sorted = true

        if !sorted
          $scope.talks = data.sort (a, b) -> a.start > b.start


      , true
    $scope.$watch 'tracks', (data) -> $('.TrackList').collapsible()

    $scope.addTalk = -> $scope.talks.$add(entryTemplates.newTalk($stateParams.id, $scope.conference))
    $scope.addTrack = -> $scope.tracks.$add entryTemplates.newTrack($stateParams, $scope)

    return

  # LOAD CONFERENCE FROM DATABASE
  # if there is an ID given through the path, try to load from ID
  # otherwise or if it fails, go to the dashboard
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
        try
          # lil hack i'm lazy right now
          # and this whole thing is a hack anyways
          $scope.$digest()
        catch e
        bindUiWidgets()
      else
        $state.go 'dashboard'
  else
    $state.go 'dashboard'


  $scope.save = ->
    conferenceToUpdate = clone($scope.conference)
    Materialize.toast 'Konferenz gespeichert.', 1000
    conferenceToUpdate.start = new Date(conferenceToUpdate.start).getUnixTime()
    conferenceToUpdate.end = new Date(conferenceToUpdate.end).getUnixTime()
    conferenceToUpdate.corporateidentity.color = hexify $('input[name="color"]')[0].value
    conferenceRef.update conferenceToUpdate

  $scope.removeConference = ->
    conferenceRef.remove()
    $state.go 'dashboard'

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

  # save entry when changing path
  # WARNING: Does not work when user closes the tab / window
  $scope.$on "$locationChangeStart", $scope.save


  $scope.initializeTimetable = (talks, tracks) ->
    locations = []
    locations.push ''
    timetable = new Timetable()

    getTrackName = (tracks, talk) ->
      if talk.track?
        for track in tracks
          return track.name if track.$id == talk.track
      else
        return ''

    for track in tracks
      locations.push track.name

    timetable.addLocations locations

    for talk in talks
      start = talk.start
      end = talk.end
      if start > end
        end = start.setHours(start.getHours() + 1)
      timetable.addEvent talk.name, getTrackName(tracks, talk), new Date(start * 1000), new Date(end * 1000)

    talks = clone(talks)
    tracks = clone(tracks)
    tracks.push ''

    # timetable.setScope(9, 17)

    renderer = new Timetable.Renderer(timetable)

    renderer.draw('.timetable')
