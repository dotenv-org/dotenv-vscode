const vscode = require('vscode')
const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')

const javascriptCompletion = {
  provideCompletionItems: function (document, position) {
    const linePrefix = document.lineAt(position).text.slice(0, position.character)
    if (!linePrefix.endsWith('process.env.')) {
      return undefined
    }

    const dir = projectDir(document.fileName)

    if (dir) {
      const pathToEnv = `${dir}/.env`
      const parsed = dotenv.config({ path: `${dir}/.env` }).parsed
      const entries = Object.entries(parsed) // converts key: value to [key, value]

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
          const s = `${pathToEnv}
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
    } else {
      return undefined
    }
  }
}

function projectDir (fileName) {
  const dir = path.dirname(fileName)
  const envExists = fs.existsSync(`${dir}/.env`)

  if (envExists) {
    return dir
  } else {
    return dir === '/' ? null : projectDir(dir)
  }
}

module.exports.javascriptCompletion = javascriptCompletion
