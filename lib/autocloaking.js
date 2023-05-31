const vscode = require('vscode')
const decorations = require('./decorations')
const scope = 'keyword.other.dotenv'

const workspace = vscode.workspace

const run = function (context) {
  if (enabled()) {
    console.log('hiding values')
    hideValues()
  } else {
    console.log('unhiding values')
    unhideValues()
  }

  // decorateMasking(context)
  // buildToggle(context)

  // const toggleAutocloaking = vscode.commands.registerCommand('dotenv.toggleAutocloaking', function () { dotenvToggleAutocloaking() })

  // context.subscriptions.push(toggleAutocloaking)
}

function hideValues () {
  const config = workspace.getConfiguration(undefined).inspect(section()).globalValue || {}

  try {
    const rules = Array.isArray(config?.textMateRules) ? config.textMateRules : []

    // in order to prevent double adding
    const newRules = rules.filter((rule) => rule?.scope !== scope)
    // add new rule
    newRules.push({
      scope,
      settings: { foreground: '#FF000000' } // set transparency to 0
    })

    // Update the textMateRules without changing the other tokenColorCustomization values (issue #79)
    config.textMateRules = newRules
    workspace.getConfiguration(undefined).update(section(), config, vscode.ConfigurationTarget.Global)
  } catch (e) {
    console.log(e)
  }

  return true
}

function section () {
  return 'editor.tokenColorCustomizations'
}

function unhideValues () {
  const config = workspace.getConfiguration(undefined).inspect(section()).globalValue
  const rules = config ? config.textMateRules : undefined // config can be undefined
  const newRules = []

  if (rules) {
    for (const rule of rules) {
      if (rule.scope === scope) {
        // removes the hide rule
      } else {
        newRules.push(rule) // preserve any other rules
      }
    }
  }

  // Update textMateRules without deleting other tokenColorCustomization settings (issue #79)
  const value = config
  value.textMateRules = newRules
  workspace.getConfiguration(undefined).update(section(), value, vscode.ConfigurationTarget.Global)

  return true
}

function decorateMasking (context) {
  // decorations.decorate(context, vscode.window.activeTextEditor)

  // Update when a file opens
  vscode.window.onDidChangeActiveTextEditor(function (editor) {
    // decorations.decorate(context, editor)
  })
  workspace.onDidOpenTextDocument(function (event) {
    const openEditor = vscode.window.visibleTextEditors.filter(function (editor) {
      try {
        return editor.document.uri === event.document.uri
      } catch (e) {
        console.log(e)
        return false
      }
    })[0]
    // decorations.decorate(context, openEditor)
  })

  // Update when moving around the editor
  // vscode.window.onDidChangeTextEditorSelection(function () {
  //   decorations.decorate(context, vscode.window.activeTextEditor)
  // })

  // Update if the config was changed
  workspace.onDidChangeConfiguration(function (event) {
    if (event.affectsConfiguration('dotenv.enableAutocloaking')) {
      // decorations.decorate(context, vscode.window.activeTextEditor)
    }
  })
}

const toggleLink = {
  provideCodeLenses: function (document, token) {
    const range = new vscode.Range(0, 1, 10, 10) // place at top of file
    const lens = new vscode.CodeLens(range, {
      command: 'dotenv.toggleAutocloaking',
      title: 'Toggle auto-cloaking'
    })
    return [
      lens
    ]
  }
}

function buildToggle (context) {
  const codeLens = vscode.languages.registerCodeLensProvider({ pattern: '**/.env*' }, toggleLink)

  context.subscriptions.push(codeLens)

  return true
}

function enabled () {
  const enableAutocloaking = workspace.getConfiguration('[dotenv]').get('enableAutocloaking')

  return enableAutocloaking

  // return workspace.getConfiguration('dotenv').get('enableAutocloaking')
}

function dotenvToggleAutocloaking () {
  if (enabled()) {
    unhideValues()
    workspace.getConfiguration('dotenv').update('enableAutocloaking', false)
  } else {
    hideValues()
    workspace.getConfiguration('dotenv').update('enableAutocloaking', true)
  }

  return true
}

module.exports.run = run
