const vscode = require('vscode')
const decorations = require('./decorations')

const run = function(context) {
  if (enabled()) {
    hideValues()
  } else {
    unhideValues()
  }

  decorateMasking(context)
  buildToggle(context)

  const toggleAutocloaking = vscode.commands.registerCommand('dotenv.toggleAutocloaking', function() { dotenvToggleAutocloaking() })

  context.subscriptions.push(toggleAutocloaking)
}

function hideValues() {
  const section = 'editor.tokenColorCustomizations'
  const scope = 'keyword.other.dotenv'

  let config = vscode.workspace.getConfiguration().inspect(section).globalValue
  // todo - modify this rather than overwriting it completely. could have user set values

  const value = {
    "textMateRules": [
      {
        "scope": scope,
        "settings": { "foreground": "#FF000005" } // set transparency to 0
      }
    ]
  }
  vscode.workspace.getConfiguration().update(section, value, vscode.ConfigurationTarget.Global)

  return true
}

function unhideValues() {
  const section = 'editor.tokenColorCustomizations'

  let config = vscode.workspace.getConfiguration().inspect(section).globalValue
  // todo - modify this rather than overwriting it completely. could have user set values

  const value = {}
  vscode.workspace.getConfiguration().update(section, value, vscode.ConfigurationTarget.Global)

  return true
}

function decorateMasking(context) {
  let timeoutId

  decorations.decorate(context, vscode.window.activeTextEditor)

  // Update when a file opens
  vscode.window.onDidChangeActiveTextEditor(function (editor) {
    decorations.decorate(context, editor)
  })
  vscode.workspace.onDidOpenTextDocument(function (event) {
    const openEditor = vscode.window.visibleTextEditors.filter(function (editor) { return editor.document.uri === event.document.uri })[0]
    decorations.decorate(context, openEditor)
  })

  // Update when a file saves
  // vscode.workspace.onWillSaveTextDocument(function (event) {
  //   const openEditor = vscode.window.visibleTextEditors.filter(function (editor) { return editor.document.uri === event.document.uri })[0]
  //   decorations.decorate(context, openEditor)
  // })

  // // Update when text is changed
  // vscode.workspace.onDidChangeTextDocument(function (event) {
  //   if (timeoutId) {
  //     clearTimeout(timeoutId)
  //   }

  //   timeoutId = setTimeout(function () {
  //     const openEditor = vscode.window.visibleTextEditors.filter(function (editor) { return editor.document.uri === event.document.uri })[0]
  //     decorations.decorate(context, openEditor)
  //   }, 100)
  // })

  // Update when moving around the editor
  vscode.window.onDidChangeTextEditorSelection(function () {
    decorations.decorate(context, vscode.window.activeTextEditor)
  })

  // Update if the config was changed
  vscode.workspace.onDidChangeConfiguration(function(event) {
    // console.log(event)

    if (event.affectsConfiguration('dotenv.enableAutocloaking')) {
      console.log('effected1')
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

function buildToggle(context) {
  const codeLens = vscode.languages.registerCodeLensProvider({ scheme: 'file', language: 'dotenv' }, toggleLink)

  context.subscriptions.push(codeLens)

  return true
}

function enabled() {
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
