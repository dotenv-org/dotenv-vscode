const vscode = require('vscode')

const helpers = require('./helpers')

const javascriptHover = {
  provideHover: function (document, position, token) {
    const reg = /process.env.([A-Z]{1}[A-Z_0123456789]+)/
    const line = document.lineAt(position).text
    const matches = line.match(reg)

    if (!matches) {
      return undefined
    } else {
      const key = matches[1]

      const start = line.indexOf(key)
      const end = start + key.length
      if (position.character >= start && position.character <= end) {
        const parsed = helpers.envParsed()
        const value = parsed[key]

        return new vscode.Hover(value)
      } else {
        return undefined
      }
    }
  }
}

const javascriptCompletion = {
  provideCompletionItems: function (document, position) {
    const linePrefix = document.lineAt(position).text.slice(0, position.character)
    if (!linePrefix.endsWith('process.env.')) {
      return undefined
    }

    const entries = helpers.envEntries()

    return entries.map(function (env) {
      const key = env[0].trim()
      const value = env[1].trim()

      // https://code.visualstudio.com/api/references/vscode-api#CompletionItemLabel
      const completionItemLabel = {
        label: key,
        detail: ` ${value}`
      }
      const item = new vscode.CompletionItem(completionItemLabel, vscode.CompletionItemKind.Variable)

      item.insertText = key

      if (!value) {
        // do nothing
      } else {
        const s = `.env
<hr/>

**${key}**

<pre><code>${value}</code></pre>
`
        const doc = new vscode.MarkdownString(s)
        doc.value = s
        doc.supportHtml = true
        // item.documentation = value // update with more details
        item.documentation = doc // more details
      }

      return item
    })
  }
}

const viewDotenvNew = {
  refresh: function () {
    return null
  },

  getTreeItem: function (element) {
    vscode.window.showInformationMessage('get tree item')
    return element
  },

  getChildren: function (element) {
    vscode.window.showInformationMessage('get children dude')
    return []
  }
}

module.exports.javascriptHover = javascriptHover
module.exports.javascriptCompletion = javascriptCompletion
module.exports.viewDotenvNew = viewDotenvNew
