const autocloaking = require('./lib/autocloaking')
const autocompletion = require('./lib/autocompletion')
const commands = require('./lib/commands')
const peeking = require('./lib/peeking')
const fileAssociations = require('./lib/fileAssociations')

async function activate (context) {
  console.log('Dotenv is active')

  console.log('Set file associations')
  fileAssociations.run()

  console.log('Load autocompletion')
  await autocompletion.run(context)

  console.log('Load commands')
  commands.run(context)

  console.log('Load secret peeking')
  peeking.run(context)

  console.log('Load autocloaking')
  await autocloaking.run(context)
}

function deactivate () {
  console.log('Dotenv is no longer active')
}

module.exports = {
  activate,
  deactivate
}
