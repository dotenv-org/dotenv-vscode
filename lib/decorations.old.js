const path = require('path')
const vscode = require('vscode')

const decorationType = vscode.window.createTextEditorDecorationType({
  // letterSpacing: '-1ch',
  // opacity: '0'
  backgroundColor: 'green',
  border: '2px solid white'
})

const applyDecorations = function (context, editor, sourceCode) {
  if (!sourceCode) {
    console.log('no source code found')

    return
  }

  console.log('sourceCode', sourceCode)

  // let regex = /(=[\"\']?.*[\"\']?)/
  const regex = /=["']?.*["']?/

  // // let regex = /(console\.log)/
  const decorationsArray = []
  // split by line & iterate over each
  const sourceCodeArr = sourceCode.split('\n')
  for (let line = 0; line < sourceCodeArr.length; line++) {
    // then do what?

    console.log('line', sourceCodeArr[line])

    const match = sourceCodeArr[line].match(regex)
    if (match !== null && match.index !== undefined) {
      // match found, now what do we do?

      // identify the range
      const range = new vscode.Range(
        new vscode.Position(line, match.index),
        new vscode.Position(line, match.index + match[1].length)
      )

      const decoration = { range }

      decorationsArray.push(decoration)
    }
  }

  editor.setDecorations(decorationType, decorationsArray)
}

const disposeDecorations = function () {
  decorationType.dispose()
}

const redactor = function (context, editor) {
  if (!editor) { return }

  const filename = getFilename(editor)

  console.log('triggering redactor', filename)

  // only apply to .env files
  if (filename.startsWith('.env')) {
    const sourceCode = editor.document.getText()
    applyDecorations(context, editor, sourceCode)
  }
}

function getFilename (editor) {
  return path.basename(editor.document.uri.fsPath)
}

module.exports.applyDecorations = applyDecorations
module.exports.disposeDecorations = disposeDecorations
module.exports.redactor = redactor
