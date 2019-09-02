var port = Number(process.env.PORT || 8080)

var global_count = 0

var parseurl = require('parseurl')
var logger = require('morgan')
var express = require('express')
var app = express()

app.use(logger())

app.get('/', function(req, res) {
  res.send('API Counting: ' + global_count)
})

app.get('/*', function(req, res) {
  let args = parseurl(req).pathname.replace('/', '').split('+')
  let size = args[0].split('x')
  let width = size[0]
  let height = size[1]
  let font_size = Math.round(Math.max(12, Math.min(Math.min(width, height) * 0.75, 0.75 * Math.max(width, height) / 12)))
  let rectStyle = ''
  let elements = ''
  if (args.length > 1) {
    if (args.indexOf('border') > 0) {
      rectStyle += 'stroke-width: 3px; stroke: rgba(0,0,0,.1);'
    }
    if (args.indexOf('cross') > 0) {
      elements += `<line xmlns="http://www.w3.org/2000/svg" x1="0" y1="0" x2="${width}" y2="${height}" stroke-width="1" stroke="#ddd" /><line xmlns="http://www.w3.org/2000/svg" x1="${width}" y1="0" x2="0" y2="${height}" stroke-width="1" stroke="#ddd" />`
    }
  }
  res.writeHead(200, {'Content-Type': 'image/svg+xml'})
  res.end(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none"><rect width="${width}" height="${height}" style="${rectStyle}" fill="#eee"/>${elements}<text text-anchor="middle" x="${width/2}" y="${height/2}" style="fill:#aaa;font-weight:bold;font-size:${font_size}px;font-family:Arial,Helvetica,sans-serif;dominant-baseline:central">${width}x${height}</text></svg>`)
  global_count ++
})

var server = app.listen(port, function() {
  console.log('Listening on port %d', server.address().port)
})
