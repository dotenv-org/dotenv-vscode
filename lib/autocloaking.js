const vscode = require('vscode')
const decorations = require('./decorations')
const settings = require('./settings')
// const scope = 'keyword.other.dotenv'

const run = async function (context) {
  if (settings.autocloakingEnabled()) {
    await settings.mask()
    // hideValues()
  } else {
    await settings.unmask()
    // unhideValues()
  }

  decorateMasking(context)
  buildToggle(context)

  const toggleAutocloaking = vscode.commands.registerCommand('dotenv.toggleAutocloaking', async function () { await dotenvToggleAutocloaking() })

  context.subscriptions.push(toggleAutocloaking)
}

// function hideValues () {
//   const config = vscode.workspace.getConfiguration().inspect(section()).globalValue
//
//   try {
//     const newRules = settings.textMateRules()
//
//     // Update the textMateRules without changing the other tokenColorCustomization values (issue #79)
//     const value = config || {}
//     value.textMateRules = newRules
//     vscode.workspace.getConfiguration().update(section(), value, vscode.ConfigurationTarget.Global)
//   } catch (e) {
//     console.log(e)
//   }
//
//   return true
// }

// function section () {
//   return 'editor.tokenColorCustomizations'
// }

// function unhideValues () {
//   const config = vscode.workspace.getConfiguration().inspect(section()).globalValue
//   const rules = config ? config.textMateRules : undefined // config can be undefined
//   const newRules = []
//
//   if (rules) {
//     for (const rule of rules) {
//       if (rule.scope === scope) {
//         // removes the hide rule
//       } else {
//         newRules.push(rule) // preserve any other rules
//       }
//     }
//   }
//
//   // Update textMateRules without deleting other tokenColorCustomization settings (issue #79)
//   const value = config
//   value.textMateRules = newRules
//   vscode.workspace.getConfiguration().update(section(), value, vscode.ConfigurationTarget.Global)
//
//   return true
// }

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
  const codeLens = vscode.languages.registerCodeLensProvider({ pattern: '**/.env*' }, toggleLink)

  context.subscriptions.push(codeLens)

  return true
}

async function dotenvToggleAutocloaking () {
  if (settings.autocloakingEnabled()) {
    await settings.unmask()
    // unhideValues()
    await settings.autocloakingOff()
  } else {
    // hideValues()
    await settings.mask()
    await settings.autocloakingOn()
  }

  return true
}

module.exports.run = run
