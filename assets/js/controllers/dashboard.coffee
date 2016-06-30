app.controller 'dashboardController', ($scope, $firebaseArray, $location) ->
  conferencesRef = fbRef.child('conferences')
  # new conference template
  # used on load error

  newConference = ->
    {
      name: ''
      description: ''
      start: new Date
      end: new Date
      location:
        street: ''
        housenumber: ''
        zip: ''
        city: ''
      corporateidentity:
        color: 'rgb(252,255,255)'
        logo: ''
      published: false
      organizerId: fbRef.getAuth().uid
    }

  console.log $scope.conferences = $firebaseArray(fbRef.child('conferences').orderByChild('organizerId').equalTo(fbRef.getAuth().uid)).$loaded (array) ->
    $scope.conferences = array
    preloader.classList.remove 'active'

  $scope.user = ID: 'someUserId'

  $scope.changeView = (conference) ->
    conferencePath = '/edit/' + conference.name + '/' + conference.$id
    $location.path conferencePath
    #console.log(conference.$id);
    return

  $scope.createConference = ->
    conferenceToSave = newConference()
    conferenceToSave.start = new Date(conferenceToSave.start).getUnixTime()
    conferenceToSave.end = new Date(conferenceToSave.end).getUnixTime()
    conferencesRef.push conferenceToSave
    return
