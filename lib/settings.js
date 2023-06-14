// set and unset settings

const vscode = require('vscode')

const configurationKey = 'dotenv'
// const autocloakingSettingKey = 'enableAutocloaking' // DO NOT CHANGE. see package.json for default to true

// WARNING. Do not change these without also adjusting package.json
const autocloakingEnabledKey = 'dotenv.enableAutocloaking'
const cloakColorKey = 'dotenv.cloakColor'
const cloakIconKey = 'dotenv.cloakIcon'

// actions
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

// settings
function autocloakingEnabled () {
  return !!userConfig().get(autocloakingEnabledKey)
}

function cloakColor () {
  return userConfig().get(cloakColorKey)
}

function cloakIcon () {
  return userConfig().get(cloakIconKey)
}

module.exports.workspaceConfig = workspaceConfig

// actions
module.exports.autocloakingOff = autocloakingOff
module.exports.autocloakingOn = autocloakingOn

// settings
module.exports.autocloakingEnabled = autocloakingEnabled
module.exports.cloakColor = cloakColor
module.exports.cloakIcon = cloakIcon
