const fs = require('fs')
const path = require('path')

const vscode = require('vscode')

const dotenv = require('dotenv')

const ENV_FILE = '.env'

function getParsed (document) {
  const dir = projectDir(document.fileName)

  if (dir) {
    const pathToEnv = getPathToEnv(document)
    const parsed = dotenv.config({ path: pathToEnv }).parsed

    return parsed
  } else {
    return undefined
  }
}

function getPathToEnv (document) {
  const dir = projectDir(document.fileName)

  if (dir) {
    return `${dir}/${ENV_FILE}`
  } else {
    return undefined
  }
}

function projectDir (fileName) {
  vscode.window.showInformationMessage(`fileName: ${fileName}`)

  const dir = path.dirname(fileName)
  const envExists = fs.existsSync(`${dir}/${ENV_FILE}`)

  if (envExists) {
    return dir
  } else {
    console.log(dir)

    return dir === '/' ? null : projectDir(dir)
  }
}

module.exports.getParsed = getParsed
module.exports.getPathToEnv = getPathToEnv
