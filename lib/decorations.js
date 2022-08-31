const vscode = require('vscode')

const keywordDecoration = vscode.window.createTextEditorDecorationType({
  letterSpacing: '-1ch',
  opacity: '0',
})

const semicolonDecoration = vscode.window.createTextEditorDecorationType({})

const applyDecorations = function (_ctx, editor, patches) {
  const cursorPosition = editor.selection.active
  const selectionStartPosition = editor.selection.anchor
  const selectionEndLine = cursorPosition.line
  const selectionStartLine = selectionStartPosition.line

  const decorationsArray = patches
    .map(function(patch) {
      return {
        range: new vscode.Range(
          new vscode.Position(patch.start.line -1, patch.start.column),
          new vscode.Position(patch.end.line -1, patch.end.column)
        ),
        renderOptions: {
          before: {
            contentText: `=${patch.maskedText}`,
            fontStyle: vscode.workspace.getConfiguration("decorations").get("fontStyle"),
            fontWeight: vscode.workspace.getConfiguration("decorations").get("fontWeight"),
          },
          letterSpacing: '-1ch',
          opacity: '0',
        }
      }
    })
    .filter(function(item) {
      // don't mask if viewing
      if(
        item.range.start.line === selectionEndLine
        && cursorPosition.isBeforeOrEqual(item.range.end)
        && cursorPosition.isAfterOrEqual(item.range.start)
      ) {
        // if(
        //   selectionStartPosition.isBefore(item.range.end)
        //   && selectionStartPosition.isAfter(item.range.start) &&
        //     cursorPosition.isBefore(item.range.end)
        //     && cursorPosition.isAfter(item.range.start)
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
  editor.setDecorations(keywordDecoration, decorationsArray)
}

const disposeDecorations = function() {
  keywordDecoration.dispose()
}

module.exports.applyDecorations = applyDecorations
module.exports.disposeDecorations = disposeDecorations
