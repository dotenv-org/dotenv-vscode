const vscode = require('vscode')
const path = require('path')

const icon = '█' // ░ █ * •

const maskDecoration = vscode.window.createTextEditorDecorationType({
  letterSpacing: '-1ch',
  opacity: '0'
})

const parse = function(sourceCode) {
  const arr = []
  // const stillDisplayCommentsRegex = /((=|:)\s?".+"|(=|:)\s?'.+'|(=|:)\s?`.+`|(=|:).*\s?(\s#)?)/
  const regex = /=.+/
  let lineIndex = 0

  const lines = sourceCode.split('\n')
  for (let line of lines) {
    lineIndex += 1

    const r = new RegExp(regex, "g")
    const matches = r.exec(line)

    if (!!matches) {
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

  const selectionStartPosition = editor.selection.anchor
  const selectionStartLine = selectionStartPosition.line

  const decorationsArray = patches
    .map(function(patch) {
      const range = new vscode.Range(
        new vscode.Position(patch.start.line -1, patch.start.column),
        new vscode.Position(patch.end.line -1, patch.end.column)
      )
      return {
        range: range,
        // hoverMessage: 'testing this out',
        renderOptions: {
        //   before: {
        //     contentText: `=${patch.maskedText}`,
        //     // fontStyle: vscode.workspace.getConfiguration("decorations").get("fontStyle"),
        //     // fontWeight: vscode.workspace.getConfiguration("decorations").get("fontWeight"),
        //   },
          letterSpacing: '-1ch', // squooshes them all together
          opacity: '0',
          after: {
            color: 'black',
            contentText: `=${patch.maskedText}`
          }

        }
      }
    })
    .filter(function(item) {
      // don't mask if cursor viewing
      if(
        item.range.start.line === selectedLine
        && cursor.isAfterOrEqual(item.range.start)
        // && cursor.isBeforeOrEqual(item.range.end)
      ) {
        // if(
        //   selectionStartPosition.isBefore(item.range.end)
        //   && selectionStartPosition.isAfter(item.range.start) &&
        //     cursor.isBefore(item.range.end)
        //     && cursor.isAfter(item.range.start)
        //     && !editor.selection.contains(item.range)
        // ) {
        //   editor.selections = [
        //     new vscode.Selection(
        //       item.range.start.line,
        //       item.range.start.character,
        //       item.range.end.line,
        //       item.range.end.character
        //     )
        //   ]
        // }
        return false
      }
      return true
    })
  editor.setDecorations(maskDecoration, decorationsArray)
}

const disposeDecorations = function() {
  maskDecoration.dispose()
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

  // TODO: ability to disable setting
  // const isEnabled = true // vscode.workspace.getConfiguration(settingsKey).get('enabled')
  // if(!isEnabled) {
  //   decorations.applyDecorations(_ctx, editor, [])
  //   return
  // }

  const sourceCode = editor.document.getText()
  patches = parse(sourceCode)
  applyDecorations(context, editor, patches)
}

module.exports.decorate = decorate
