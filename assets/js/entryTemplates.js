window.entryTemplates = {
  /////////////////////////////////////////
  // TEMPLATES FOR NEW ENTRIES

  // new talk template
  // used in addTalk()
  newTalk: function(conferenceId, conference){

    var start = new Date(conference.start.setHours(conference.start.getHours()))
    var end = new Date(conference.start.setHours(conference.start.getHours() + 1))

    return {
        name: "",
        description: "",
        track: null,
        start: start.getUnixTime(),
        end: end.getUnixTime(),
        location: 'someWhere',
        speaker: '',
        speakerDescription: '',
        speakerPicture: '',
        conferenceId: conferenceId
    }
  },

  // new track template
  // used in addTrack()
  newTrack: function($stateParams, $scope){
      return {
          name: "New Track",
          conferenceId: $stateParams.id,
          description: "This appears to be a very mysterious place"
      }
  }
}
