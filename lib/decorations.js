const vscode = require('vscode')
const path = require('path')
const autocloaking = require('./autocloaking')

const icon = '█' // ░ █ * •

const maskDecoration = vscode.window.createTextEditorDecorationType({
  letterSpacing: '-1ch',
  opacity: '0'
})

const parse = function (sourceCode) {
  const arr = []
  // const stillDisplayCommentsRegex = /((=|:)\s?".+"|(=|:)\s?'.+'|(=|:)\s?`.+`|(=|:).*\s?(\s#)?)/
  const regex = /=.+/
  let lineIndex = 0

  const lines = sourceCode.split('\n')
  for (const line of lines) {
    lineIndex += 1

    const r = new RegExp(regex, 'g')
    const matches = r.exec(line)

    if (matches) {
      const firstMatch = matches[0]

      if (firstMatch) {
        const startIndex = line.indexOf(firstMatch)
        const endIndex = startIndex + firstMatch.length

        // build line and column start and ends
        arr.push({
          maskedText: icon.repeat(firstMatch.length),
          start: { line: lineIndex, column: startIndex },
          end: { line: lineIndex, column: endIndex }
        })
      }
    }
  }

  return arr
}

const applyDecorations = function (_ctx, editor, patches) {
  const cursor = editor.selection.active
  const selectedLine = cursor.line

  const decorationsArray = patches
    .map(function (patch) {
      const range = new vscode.Range(
        new vscode.Position(patch.start.line - 1, patch.start.column),
        new vscode.Position(patch.end.line - 1, patch.end.column)
      )
      return {
        range,
        renderOptions: {
          letterSpacing: '-1ch', // squishes them together
          opacity: '0',
          after: {
            color: 'black',
            contentText: `=${patch.maskedText}`
          }
        }
      }
    })

  editor.setDecorations(maskDecoration, decorationsArray)
}

const decorate = (context, editor) => {
  if (!editor) {
    return
  }

  // only apply to .env* files
  const filename = path.basename(editor.document.uri.fsPath)
  if (!filename.startsWith('.env')) {
    return
  }

  const enabled = vscode.workspace.getConfiguration('dotenv').get('enableAutocloaking', true)

  if (!enabled) {
    applyDecorations(context, editor, [])
  } else {
    const sourceCode = editor.document.getText()
    const patches = parse(sourceCode)
    applyDecorations(context, editor, patches)
  }
}

module.exports.decorate = decorate
