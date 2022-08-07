// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode')

const DOTENV_VAULT_VERSION = '1.11.1'
const TERMINAL_NAME = 'dotenv-official'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate (context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(`Congratulations, your extension "dotenv-vault-vscode" with dotenv-vault@${DOTENV_VAULT_VERSION} is now active!`)

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  const hello = vscode.commands.registerCommand('dotenv.hello', function () {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    vscode.window.showInformationMessage('Hello World from dotenv-vscode!')
  })
  context.subscriptions.push(hello)

  const open = vscode.commands.registerCommand('dotenv.open', function () {
    dotenvOpen()
  })
  context.subscriptions.push(open)
}


function dotenvOpen() {
  vscode.window.showInformationMessage('`dotenv-vault open` command executed on terminal')

  let terminal = vscode.window.activeTerminal
  if (!terminal) {
    terminal = vscode.window.createTerminal(TERMINAL_NAME)
  }

  terminal.sendText('npx --yes dotenv-vault@' + DOTENV_VAULT_VERSION + ' open --yes')
  terminal.show()
}

// this method is called when your extension is deactivated
function deactivate () {}

module.exports = {
  activate,
  deactivate
}
