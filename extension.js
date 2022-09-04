const autocloaking = require('./lib/autocloaking')
const autocompletion = require('./lib/autocompletion')
const commands = require('./lib/commands')
const peeking = require('./lib/peeking')

function activate (context) {
  console.log('Dotenv is active')

  autocloaking.run(context) // turn on auto-cloaking
  autocompletion.run(context) // autocompletion
  commands.run(context) // vault commands
  peeking.run(context) // secret peeking
}

function deactivate () {
  console.log('Dotenv is no longer active')
}

module.exports = {
  activate,
  deactivate
}
