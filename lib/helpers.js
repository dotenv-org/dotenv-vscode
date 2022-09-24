const vscode = require('vscode')
const dotenv = require('dotenv')

function envEntries () {
  const parsed = envParsed()

  if (parsed) {
    const entries = Object.entries(parsed) // converts key: value to [key, value]

    return entries
  } else {
    return [['KEY', 'VALUE']] // serves as example
  }
}

function envParsed () {
  const workspacePath = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.fsPath.replace(/\\/g, '/') : undefined // /path/to/project/folder

  let parsed = {}

  if (workspacePath) {
    parsed = dotenv.config({ path: `${workspacePath}/.env` }).parsed
  } else {
    parsed = dotenv.config().parsed
  }

  return parsed
}

module.exports.envEntries = envEntries
module.exports.envParsed = envParsed
