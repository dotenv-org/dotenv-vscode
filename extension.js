// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode')
const providers = require('./lib/providers')

const DOTENV_VAULT_VERSION = '1.11.2'
const TERMINAL_NAME = 'Dotenv'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

vscode.commands.executeCommand('setContext', 'dotenvNew', true)

/**
 * @param {vscode.ExtensionContext} context
 */
function activate (context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Dotenv is active!')

  // Commands
  const login = vscode.commands.registerCommand('dotenv.login', function () { dotenvLogin() })
  const logout = vscode.commands.registerCommand('dotenv.logout', function () { dotenvLogout() })
  const neww = vscode.commands.registerCommand('dotenv.new', function () { dotenvNew() })
  const open = vscode.commands.registerCommand('dotenv.open', function () { dotenvOpen() })
  const pull = vscode.commands.registerCommand('dotenv.pull', function () { dotenvPull() })
  const push = vscode.commands.registerCommand('dotenv.push', function () { dotenvPush() })
  const status = vscode.commands.registerCommand('dotenv.status', function () { dotenvStatus() })
  const versions = vscode.commands.registerCommand('dotenv.versions', function () { dotenvVersions() })
  const whoami = vscode.commands.registerCommand('dotenv.whoami', function () { dotenvWhoami() })

  context.subscriptions.push(login)
  context.subscriptions.push(logout)
  context.subscriptions.push(neww)
  context.subscriptions.push(open)
  context.subscriptions.push(pull)
  context.subscriptions.push(push)
  context.subscriptions.push(status)
  context.subscriptions.push(versions)
  context.subscriptions.push(whoami)

  // Language
  const javascript = vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: 'javascript' }, providers.javascriptCompletion, '.')
  const typescript = vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: 'typescript' }, providers.javascriptCompletion, '.')
  const javascriptreact = vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: 'javascriptreact' }, providers.javascriptCompletion, '.')
  const typescriptreact = vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: 'typescriptreact' }, providers.javascriptCompletion, '.')
  const vue = vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: 'vue' }, providers.javascriptCompletion, '.')

  context.subscriptions.push(javascript)
  context.subscriptions.push(typescript)
  context.subscriptions.push(javascriptreact)
  context.subscriptions.push(typescriptreact)
  context.subscriptions.push(vue)

  // Hover
  const javascriptHover = vscode.languages.registerHoverProvider({ scheme: 'file', language: 'javascript' }, providers.javascriptHover)
  const typescriptHover = vscode.languages.registerHoverProvider({ scheme: 'file', language: 'typescript' }, providers.javascriptHover)
  const javascriptreactHover = vscode.languages.registerHoverProvider({ scheme: 'file', language: 'javascriptreact' }, providers.javascriptHover)
  const typescriptreactHover = vscode.languages.registerHoverProvider({ scheme: 'file', language: 'typescriptreact' }, providers.javascriptHover)
  const vueHover = vscode.languages.registerHoverProvider({ scheme: 'file', language: 'vue' }, providers.javascriptHover)

  context.subscriptions.push(javascriptHover)
  context.subscriptions.push(typescriptHover)
  context.subscriptions.push(javascriptreactHover)
  context.subscriptions.push(typescriptreactHover)
  context.subscriptions.push(vueHover)

  // sidebar
  // const rootPath = (vscode.workspace.workspaceFolders && (vscode.workspace.workspaceFolders.length > 0))
  //  ? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined

  // // context state
  // vscode.commands.executeCommand('setContext', 'dotenv.state.new', true)
  // // vscode.commands.executeCommand('setContext', 'jsonOutlineEnabled', true)

  // // const status = vscode.commands.registerCommand('dotenv.status', function() {
  // //   const panel = vscode.window.createWebviewPanel(
  // //     'openWebview', // Identifies the type of the webview. Used internally
  // //     'page', // Title of the panel displayed to the user
  // //     vscode.ViewColumn.One, // Editor column to show the new webview panel in.
  // //     { // Enable scripts in the webview
  // //       enableScripts: true //Set this to true if you want to enable Javascript.
  // //     })
  // //   return panel
  // // })
  // // context.subscriptions.push(status)
  // const newView = vscode.window.registerWebviewViewProvider('dotenv.newView', {
  //   resolveWebviewView: async function(webviewView, context, _token) {

  //     const vaultExists = await vscode.workspace.fs.stat()

  //     console.log('exists', vaultExists)

  //     webviewView.webview.options = {
  //       enableScripts: true, // enable js scripts
  //     }

  //     if (vaultExists) {
  //       webviewView.webview.html = `<!DOCTYPE html>
  //         <html>
  //           <body>
  //             .env.vault exists
  //           </body>
  //         </html>`
  //     } else {
  //       webviewView.webview.html = `<!DOCTYPE html>
  //         <html>
  //           <body>
  //             Missing .env.vault
  //           </body>
  //         </html>`
  //     }

  //   }
  // })
}

// commands
function dotenvLogin () {
  const command = 'login'
  promptCommand(command)
}

function dotenvLogout () {
  const command = 'logout'
  promptCommand(command)
}

function dotenvNew () {
  const command = 'new'
  promptCommand(command)
}

function dotenvOpen () {
  const command = 'open'
  promptCommand(command)
}

function dotenvPull () {
  const command = 'pull'
  promptCommand(command)
}

function dotenvPush () {
  const command = 'push'
  promptCommand(command)
}

function dotenvStatus () {
  const command = 'status'
  promptCommand(command)
}

function dotenvVersions () {
  const command = 'versions'
  promptCommand(command)
}

function dotenvWhoami () {
  const command = 'whoami'

  infoMessage(command, function (yes) {
    if (yes) {
      const terminal = getTerminal()
      terminal.sendText(`npx --yes dotenv-vault@${DOTENV_VAULT_VERSION} ${command}`)
      terminal.show()
    }
  })
}

// helpers
function commandDetails (command) {
  switch (command) {
    case 'new':
      return 'Create your project'
    case 'login':
      return 'Log in to Dotenv Vault'
    case 'logout':
      return 'Log out of Dotenv Vault'
    case 'open':
      return 'Open project page'
    case 'push':
      return 'Push .env securely'
    case 'pull':
      return 'Pull .env securely'
    case 'versions':
      return 'List version history'
    case 'whoami':
      return 'Display the current logged in user'
    case 'status':
      return 'Check Dotenv Vault operational status'
    default:
      return ''
  }
}

function commandDocsUrl (command) {
  switch (command) {
    case 'new':
      return 'https://www.dotenv.org/docs/dotenv-vault/new'
    case 'login':
      return 'https://www.dotenv.org/docs/dotenv-vault/login'
    case 'logout':
      return 'https://www.dotenv.org/docs/dotenv-vault/logout'
    case 'open':
      return 'https://www.dotenv.org/docs/dotenv-vault/open'
    case 'push':
      return 'https://www.dotenv.org/docs/dotenv-vault/push'
    case 'pull':
      return 'https://www.dotenv.org/docs/dotenv-vault/pull'
    case 'versions':
      return 'https://www.dotenv.org/docs/dotenv-vault/versions'
    case 'whoami':
      return 'https://www.dotenv.org/docs/dotenv-vault/whoami'
    case 'status':
      return 'https://www.dotenv.org/docs/dotenv-vault/status'
    default:
      return 'https://www.dotenv.org/docs'
  }
}

function infoMessage (command, callback) {
  const msg = `$ npx dotenv-vault ${command}`
  const details = commandDetails(command)
  const docsUrl = commandDocsUrl(command)
  const options = { detail: details, modal: true }

  vscode.window.showInformationMessage(msg, options, ...['Ok', 'Documentation']).then((result) => {
    if (result === 'Ok') {
      const output = true

      callback(output)
    } else {
      if (result === 'Documentation') {
        vscode.env.openExternal(docsUrl)
      }

      const output = false
      callback(output)
    }
  })
}

function getTerminal () {
  let terminal = vscode.window.activeTerminal
  if (!terminal) {
    terminal = vscode.window.createTerminal(TERMINAL_NAME)
  }

  return terminal
}

function runCommand (terminal, command) {
  terminal.sendText(`npx --yes dotenv-vault@${DOTENV_VAULT_VERSION} ${command} --yes`)
  terminal.show()
}

function promptCommand (command) {
  infoMessage(command, function (yes) {
    if (yes) {
      const terminal = getTerminal()
      runCommand(terminal, command)
    }
  })
}

// this method is called when your extension is deactivated
function deactivate () {}

module.exports = {
  activate,
  deactivate
}
