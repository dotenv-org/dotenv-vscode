// set and unset settings

const vscode = require('vscode')

const configurationKey = 'dotenv'
const autocloakingSettingKey = 'enableAutocloaking' // DO NOT CHANGE

function autocloakingOn () {
  return !!config().get(autocloakingSettingKey)
}

function turnOffAutocloaking () {
  config().update(autocloakingSettingKey, false)
  return true
}

function turnOnAutocloaking () {
  config().update(autocloakingSettingKey, true)
  return true
}

function config () {
  return vscode.workspace.getConfiguration(configurationKey)
}

module.exports.config = config
module.exports.autocloakingOn = autocloakingOn
module.exports.turnOffAutocloaking = turnOffAutocloaking
module.exports.turnOnAutocloaking = turnOnAutocloaking
