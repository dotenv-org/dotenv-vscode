const vscode = require('vscode')
const providers = require('./providers')

const run = function (context) {
  const javascriptHover = vscode.languages.registerHoverProvider({ scheme: 'file', language: 'javascript' }, providers.javascriptHover)
  const typescriptHover = vscode.languages.registerHoverProvider({ scheme: 'file', language: 'typescript' }, providers.javascriptHover)
  const javascriptreactHover = vscode.languages.registerHoverProvider({ scheme: 'file', language: 'javascriptreact' }, providers.javascriptHover)
  const typescriptreactHover = vscode.languages.registerHoverProvider({ scheme: 'file', language: 'typescriptreact' }, providers.javascriptHover)
  const vueHover = vscode.languages.registerHoverProvider({ scheme: 'file', language: 'vue' }, providers.javascriptHover)
  const rubyHover = vscode.languages.registerHoverProvider({ scheme: 'file', language: 'ruby' }, providers.rubyHover)
  const pythonHover = vscode.languages.registerHoverProvider({ scheme: 'file', language: 'python' }, providers.pythonHover)
  const phpHover = vscode.languages.registerHoverProvider({ scheme: 'file', language: 'php' }, providers.phpHover)
  const goHover = vscode.languages.registerHoverProvider({ scheme: 'file', language: 'go' }, providers.goHover)
  const javaHover = vscode.languages.registerHoverProvider({ scheme: 'file', language: 'java' }, providers.javaHover)
  const csharpHover = vscode.languages.registerHoverProvider({ scheme: 'file', language: 'csharp' }, providers.csharpHover)
  const rustHover = vscode.languages.registerHoverProvider({ scheme: 'file', language: 'rust' }, providers.rustHover)

  context.subscriptions.push(javascriptHover)
  context.subscriptions.push(typescriptHover)
  context.subscriptions.push(javascriptreactHover)
  context.subscriptions.push(typescriptreactHover)
  context.subscriptions.push(vueHover)
  context.subscriptions.push(rubyHover)
  context.subscriptions.push(pythonHover)
  context.subscriptions.push(phpHover)
  context.subscriptions.push(goHover)
  context.subscriptions.push(javaHover)
  context.subscriptions.push(csharpHover)
  context.subscriptions.push(rustHover)
  return true
}

module.exports.run = run
