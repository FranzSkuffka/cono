# deep clone object
window.clone = (object) -> JSON.parse JSON.stringify(object)

# merge date and time
window.mergeTimestamp = (date, time) ->
  date = new Date(date)
  time = new Date(time)
  new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds())
