#!/usr/bin/env node

'use strict'

var WarningStream = require('./')

process.stdin
  .pipe(WarningStream())
  .pipe(process.stdout)
