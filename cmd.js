#!/usr/bin/env node

cmd()

function cmd () {
  var argv = process.argv.slice(2)

  if (~argv.indexOf('--cmd') || ~argv.indexOf('-c')) {
    return require('./command')(argv)
  }

  if (!argv.length || ~argv.indexOf('-h') || ~argv.indexOf('--help')) {
    return require('fs')
      .createReadStream(__dirname + '/usage.txt')
      .pipe(process.stdout)
  }
  var stacksOnlyIx = argv.indexOf('--stacks-only')
  if (argv[stacksOnlyIx + 1] === '-') {
    argv[stacksOnlyIx] = '--stacks-only=-'
    argv.splice(stacksOnlyIx + 1, 1)
  }

  var ix = argv.indexOf('node')

  if (ix === -1) {
    var c = argv.length
    while (c--) {
      if (argv[c][0] !== '-') break
    }
    argv.splice(c, 0, 'node')
    ix = c
  }

  var args = require('minimist')(argv.slice(0, ix))
  args.node = argv.slice(ix + 1)
  args.delay = args.delay || args.d
  if (typeof args.delay === 'undefined') args.delay = 300
  require('./')(args)
}
