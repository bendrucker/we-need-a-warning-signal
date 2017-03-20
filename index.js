'use strict'

var Transform = require('stream').Transform
var player = require('play-sound')()
var path = require('path')

var AUDIO = path.resolve(__dirname, 'warning.mp3')
var RE = /\bwarn(ing)?\b/

module.exports = WarningStream

function WarningStream () {
  return new Transform({
    transform: function transform (chunk, encoding, callback) {
      if (!RE.test(chunk)) return callback(null, chunk)
      player.play(AUDIO, function (err) {
        if (err) return callback(err)
        callback(null, chunk)
      })
    }
  })
}
