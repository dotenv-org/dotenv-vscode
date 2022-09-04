const vscode = require('vscode')
const decorations = require('./decorations')
const scope = 'keyword.other.dotenv'

const run = function (context) {
  if (enabled()) {
    hideValues()
  } else {
    unhideValues()
  }

  decorateMasking(context)
  buildToggle(context)

  const toggleAutocloaking = vscode.commands.registerCommand('dotenv.toggleAutocloaking', function () { dotenvToggleAutocloaking() })

  context.subscriptions.push(toggleAutocloaking)
}

function hideValues () {
  const section = 'editor.tokenColorCustomizations'

  const config = vscode.workspace.getConfiguration().inspect(section).globalValue
  const rules = config.textMateRules
  let newRules = []

  if (rules) {
    for (const rule of rules) {
      if (rule.scope === scope) {
        // in order to prevent double adding. new rule is added below
      } else {
        newRules.push(rule) // preserve any other rules
      }
    }
  }
  const newRule = {
    scope,
    settings: { foreground: '#FF000005' } // set transparency to 0
  }
  newRules.push(newRule) // add new rule

  const value = {
    textMateRules: newRules
  }
  vscode.workspace.getConfiguration().update(section, value, vscode.ConfigurationTarget.Global)

  return true
}

function unhideValues () {
  const section = 'editor.tokenColorCustomizations'

  const config = vscode.workspace.getConfiguration().inspect(section).globalValue
  const rules = config.textMateRules
  let newRules = []

  if (rules) {
    for (const rule of rules) {
      if (rule.scope === scope) {
        // removes the hide rule
      } else {
        newRules.push(rule) // preserve any other rules
      }
    }
  }

  const value = {
    textMateRules: newRules
  }
  vscode.workspace.getConfiguration().update(section, value, vscode.ConfigurationTarget.Global)

  return true
}

function decorateMasking (context) {
  decorations.decorate(context, vscode.window.activeTextEditor)

  // Update when a file opens
  vscode.window.onDidChangeActiveTextEditor(function (editor) {
    decorations.decorate(context, editor)
  })
  vscode.workspace.onDidOpenTextDocument(function (event) {
    const openEditor = vscode.window.visibleTextEditors.filter(function (editor) {
      try {
        return editor.document.uri === event.document.uri
      } catch (e) {
        console.log(e)
        return false
      }
    })[0]
    decorations.decorate(context, openEditor)
  })

  // Update when moving around the editor
  // vscode.window.onDidChangeTextEditorSelection(function () {
  //   decorations.decorate(context, vscode.window.activeTextEditor)
  // })

  // Update if the config was changed
  vscode.workspace.onDidChangeConfiguration(function (event) {
    if (event.affectsConfiguration('dotenv.enableAutocloaking')) {
      decorations.decorate(context, vscode.window.activeTextEditor)
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
  const codeLens = vscode.languages.registerCodeLensProvider({ scheme: 'file', language: 'dotenv' }, toggleLink)

  context.subscriptions.push(codeLens)

  return true
}

function enabled () {
  return vscode.workspace.getConfiguration('dotenv').get('enableAutocloaking', true)
}

function dotenvToggleAutocloaking () {
  if (enabled()) {
    unhideValues()
    vscode.workspace.getConfiguration('dotenv').update('enableAutocloaking', false)
  } else {
    hideValues()
    vscode.workspace.getConfiguration('dotenv').update('enableAutocloaking', true)
  }

  return true
}

module.exports.run = run
