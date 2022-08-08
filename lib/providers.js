const vscode = require('vscode')
const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')

const javascriptHover = {
  provideHover: function (document, position, token) {
    // vscode.window.showInformationMessage(`position: ${position}, ${position.character}`)

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
        const parsed = getParsed(document)
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

    const entries = getEntries(document)

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
        const s = `${getPathToEnv(document)}
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

function projectDir (fileName) {
  const dir = path.dirname(fileName)
  const envExists = fs.existsSync(`${dir}/.env`)

  if (envExists) {
    return dir
  } else {
    return dir === '/' ? null : projectDir(dir)
  }
}

function getEntries (document) {
  const parsed = getParsed(document)

  if (parsed) {
    const entries = Object.entries(parsed) // converts key: value to [key, value]

    return entries
  } else {
    return [['KEY', 'VALUE']] // servers as example
  }
}

function getParsed (document) {
  const dir = projectDir(document.fileName)

  if (dir) {
    const pathToEnv = getPathToEnv(document)
    const parsed = dotenv.config({ path: pathToEnv }).parsed

    return parsed
  } else {
    return undefined
  }
}

function getPathToEnv (document) {
  const dir = projectDir(document.fileName)

  if (dir) {
    return `${dir}/.env`
  } else {
    return undefined
  }
}

module.exports.javascriptHover = javascriptHover
module.exports.javascriptCompletion = javascriptCompletion
