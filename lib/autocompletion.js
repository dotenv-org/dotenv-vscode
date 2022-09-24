const vscode = require('vscode')
const providers = require('./providers')

const run = function (context) {
  const javascript = vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: 'javascript' }, providers.javascriptCompletion, '.')
  const typescript = vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: 'typescript' }, providers.javascriptCompletion, '.')
  const javascriptreact = vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: 'javascriptreact' }, providers.javascriptCompletion, '.')
  const typescriptreact = vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: 'typescriptreact' }, providers.javascriptCompletion, '.')
  const vue = vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: 'vue' }, providers.javascriptCompletion, '.')
  const ruby = vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: 'ruby' }, providers.rubyCompletion, '[')
  const python = vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: 'python' }, providers.pythonCompletion, '(')

  context.subscriptions.push(javascript)
  context.subscriptions.push(typescript)
  context.subscriptions.push(javascriptreact)
  context.subscriptions.push(typescriptreact)
  context.subscriptions.push(vue)
  context.subscriptions.push(ruby)
  context.subscriptions.push(python)

  return true
}

module.exports.run = run
