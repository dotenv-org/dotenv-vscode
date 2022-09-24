const autocloaking = require('./lib/autocloaking')
const autocompletion = require('./lib/autocompletion')
const commands = require('./lib/commands')
const peeking = require('./lib/peeking')
const vscode = require('vscode')

function activate (context) {
  console.log('Dotenv is active')

  // const section = 'editor.tokenColorCustomizations'
  // // const config = vscode.workspace.getConfiguration(section).get('textMateRules')
  // const config = vscode.workspace.getConfiguration().inspect(section).globalValue
  // if (!config) {
  //   console.log('Load editor.tokenColorCustomizations')

  //   let value = {}
  //   vscode.workspace.getConfiguration().update(section, value, vscode.ConfigurationTarget.Global)
  //   value = {
  //     'textMateRules': []
  //   }
  //   vscode.workspace.getConfiguration().update(section, value, vscode.ConfigurationTarget.Global)
  // }

  console.log('Load autocompletion')
  autocompletion.run(context)

  console.log('Load commands')
  commands.run(context)

  console.log('Load secret peeking')
  peeking.run(context)

  console.log('Load autocloaking')
  autocloaking.run(context)
}

function deactivate () {
  console.log('Dotenv is no longer active')
}

module.exports = {
  activate,
  deactivate
}
