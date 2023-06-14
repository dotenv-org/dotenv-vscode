// set and unset settings

const vscode = require('vscode')

const configurationKey = 'dotenv'
// const autocloakingSettingKey = 'enableAutocloaking' // DO NOT CHANGE. see package.json for default to true

const autocloakingEnabledKey = 'dotenv.enableAutocloaking' // DO NOT CHANGE. see package.json

function autocloakingEnabled () {
  // return !!workspaceConfig().get(autocloakingSettingKey)
  // return !!userConfig().get(autocloakingEnabledKey)

  return !!userConfig().inspect(autocloakingEnabledKey).globalValue
}

async function autocloakingOff () {
  // workspaceConfig().update(autocloakingSettingKey, false)
  await userConfig().update(autocloakingEnabledKey, false, vscode.ConfigurationTarget.Global)
  return false
}

async function autocloakingOn () {
  // workspaceConfig().update(autocloakingSettingKey, true)
  await userConfig().update(autocloakingEnabledKey, true, vscode.ConfigurationTarget.Global)
  return true
}

function workspaceConfig () {
  return vscode.workspace.getConfiguration(configurationKey)
}

function userConfig () {
  return vscode.workspace.getConfiguration() // .inspect(section()).globalValue
}

module.exports.workspaceConfig = workspaceConfig
module.exports.userConfig = userConfig

module.exports.autocloakingEnabled = autocloakingEnabled
module.exports.autocloakingOff = autocloakingOff
module.exports.autocloakingOn = autocloakingOn
