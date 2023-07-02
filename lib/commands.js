const vscode = require('vscode')

const DOTENV_VAULT_VERSION = '1.24.0'
const TERMINAL_NAME = 'Dotenv'

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

function promptCommand (command) {
  infoMessage(command, function (yes) {
    if (yes) {
      const terminal = getTerminal()
      runCommand(terminal, command)
    }
  })
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

const run = function (context) {
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

  return true
}

module.exports.run = run
