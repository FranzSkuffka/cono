# deep clone object
window.clone = (object) -> JSON.parse JSON.stringify(object)

# merge date and time
window.mergeTimestamp = (date, time) ->
  date = new Date(date)
  time = new Date(time)
  new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds())


rgbToHexComponent = (c) ->
  c = Math.floor(c).toString(16)
  if c.length == 1
    return '0' + c
  else
    return c

window.delay = (ms) -> (fn) -> setTimeout fn, ms

window.hexify = (color) ->

  return color if /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color) # test if it's hex

  rgb = color.substring(4, color.length - 1).split ','

  console.log rgb
  colr = '#'
  colr += rgbToHexComponent rgb[0]
  colr += rgbToHexComponent rgb[1]
  colr += rgbToHexComponent rgb[2]
  return colr
