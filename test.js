'use strict'

var test = require('tape')
var fs = require('fs')
var path = require('path')
var proxyquire = require('proxyquire')
var split = require('split2')
var concat = require('concat-stream')
var child = require('child_process')

var MP3 = path.resolve(__dirname, 'warning.mp3')

test('one warning', function (t) {
  t.plan(2)

  var WarningStream = proxyquire('./', {
    'play-sound': () => ({
      play: function (file, callback) {
        t.equal(file, MP3)
        callback()
      }
    })
  })

  fs
    .createReadStream(path.resolve(__dirname, 'fixtures', 'one-warning.txt'))
    .pipe(WarningStream())
    .pipe(concat(function (data) {
      t.equal(data.toString(), 'warning\n')
    }))
})

test('one warn', function (t) {
  t.plan(1)

  var WarningStream = proxyquire('./', {
    'play-sound': () => ({
      play: function (file, callback) {
        t.equal(file, MP3)
        callback()
      }
    })
  })

  fs
    .createReadStream(path.resolve(__dirname, 'fixtures', 'one-warn.txt'))
    .pipe(WarningStream())
})

test('two warnings', function (t) {
  t.plan(2)

  var WarningStream = proxyquire('./', {
    'play-sound': () => ({
      play: function (file, callback) {
        t.equal(file, MP3)
        callback()
      }
    })
  })

  fs
    .createReadStream(path.resolve(__dirname, 'fixtures', 'two-warnings.txt'))
    .pipe(split())
    .pipe(WarningStream())
})

test('no match', function (t) {
  t.plan(0)

  var WarningStream = proxyquire('./', {
    'play-sound': () => ({
      play: t.fail
    })
  })

  fs
    .createReadStream(path.resolve(__dirname, 'fixtures', 'no-match.txt'))
    .pipe(WarningStream())
    .on('finish', t.end)
})

if (!process.env.CI) {
  test('cli', function (t) {
    t.plan(1)

    var cli = child.spawn('node', [path.resolve(__dirname, 'cli.js')])

    fs
      .createReadStream(path.resolve(__dirname, 'fixtures', 'one-warning.txt'))
      .pipe(cli.stdin)

    cli.stdout
      .pipe(concat(function (data) {
        t.equal(data.toString(), 'warning\n')
      }))
  })
}
