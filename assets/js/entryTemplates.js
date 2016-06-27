window.entryTemplates = {
  /////////////////////////////////////////
  // TEMPLATES FOR NEW ENTRIES

  // new talk template
  // used in addTalk()
  newTalk: function(conferenceId, conference){
      try{
        return {
            name: "",
            description: "",
            track: null,
            start: conference.start.getUnixTime(),
            end: conference.start.getUnixTime(),
            location: 'someWhere',
            speaker: '',
            speakerDescription: '',
            speakerPicture: '',
            conferenceId: conferenceId
        }
      }
      catch (error) {
        return {
            name: "",
            description: "",
            track: null,
            start: new Date(conference.start * 1000).getUnixTime(),
            end: new Date(conference.start * 1000).getUnixTime(),
            location: 'someWhere',
            speaker: '',
            speakerDescription: '',
            speakerPicture: '',
            conferenceId: conferenceId
        }
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
