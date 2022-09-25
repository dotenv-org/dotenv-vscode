const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const assert = require('assert')
const path = require('path')
const vscode = require('vscode')

const providers = require('../../../lib/providers')

describe('providers', function () {
  describe('#javascriptCompletion', function () {
    it('returns undefined at line 0 and wrong position', async function () {
      const javascriptFile = path.join(__dirname, '..', 'examples', 'javascript.js')
      const document = await vscode.workspace.openTextDocument(javascriptFile)
      const position = new vscode.Position(1, 22)

      const result = providers.javascriptCompletion.provideCompletionItems(document, position)

      assert.equal(result, undefined)
    })

    it('returns value at line 1 and correct position', async function () {
      const javascriptFile = path.join(__dirname, '..', 'examples', 'javascript.js')
      const document = await vscode.workspace.openTextDocument(javascriptFile)
      const position = new vscode.Position(1, 24)

      const result = providers.javascriptCompletion.provideCompletionItems(document, position)

      assert.equal(result[0].insertText, '.HELLO')
      assert.equal(result[0].label.label, 'HELLO')
      assert.equal(result[0].label.detail, ' World')
    })
  })

  describe('#rubyCompletion', function () {
    it('returns undefined at line 0 and wrong position', async function () {
      const rubyFile = path.join(__dirname, '..', 'examples', 'ruby.rb')
      const document = await vscode.workspace.openTextDocument(rubyFile)
      const position = new vscode.Position(1, 7)

      const result = providers.rubyCompletion.provideCompletionItems(document, position)

      assert.equal(result, undefined)
    })

    it('returns value at line 1 and correct position', async function () {
      const rubyFile = path.join(__dirname, '..', 'examples', 'ruby.rb')
      const document = await vscode.workspace.openTextDocument(rubyFile)
      const position = new vscode.Position(1, 9)

      const result = providers.rubyCompletion.provideCompletionItems(document, position)

      assert.equal(result[0].insertText, '["HELLO"')
      assert.equal(result[0].label.label, 'HELLO')
      assert.equal(result[0].label.detail, ' World')
    })
  })

  describe('#pythonCompletion', function () {
    it('returns undefined at line 0 and wrong position for os.environ.get format', async function () {
      const pythonFile = path.join(__dirname, '..', 'examples', 'python.py')
      const document = await vscode.workspace.openTextDocument(pythonFile)
      const position = new vscode.Position(3, 19)

      const result = providers.pythonCompletion.provideCompletionItems(document, position)

      assert.equal(result, undefined)
    })

    it('returns value at line 1 and correct position for os.environ.get format', async function () {
      const pythonFile = path.join(__dirname, '..', 'examples', 'python.py')
      const document = await vscode.workspace.openTextDocument(pythonFile)
      const position = new vscode.Position(3, 21)

      const result = providers.pythonCompletion.provideCompletionItems(document, position)

      assert.equal(result[0].insertText, '("HELLO"')
      assert.equal(result[0].label.label, 'HELLO')
      assert.equal(result[0].label.detail, ' World')
    })

    it('returns undefined at line 0 and wrong position for os.getenv format', async function () {
      const pythonFile = path.join(__dirname, '..', 'examples', 'python.py')
      const document = await vscode.workspace.openTextDocument(pythonFile)
      const position = new vscode.Position(4, 13)

      const result = providers.pythonCompletion.provideCompletionItems(document, position)

      assert.equal(result, undefined)
    })

    it('returns value at line 1 and correct position for os.getenv format', async function () {
      const pythonFile = path.join(__dirname, '..', 'examples', 'python.py')
      const document = await vscode.workspace.openTextDocument(pythonFile)
      const position = new vscode.Position(4, 16)

      const result = providers.pythonCompletion.provideCompletionItems(document, position)

      assert.equal(result[0].insertText, '("HELLO"')
      assert.equal(result[0].label.label, 'HELLO')
      assert.equal(result[0].label.detail, ' World')
    })

    it('returns undefined at line 0 and wrong position for os.environ[] format', async function () {
      const pythonFile = path.join(__dirname, '..', 'examples', 'python.py')
      const document = await vscode.workspace.openTextDocument(pythonFile)
      const position = new vscode.Position(5, 15)

      const result = providers.pythonArrayCompletion.provideCompletionItems(document, position)

      assert.equal(result, undefined)
    })

    it('returns value at line 1 and correct position for os.environ[] format', async function () {
      const pythonFile = path.join(__dirname, '..', 'examples', 'python.py')
      const document = await vscode.workspace.openTextDocument(pythonFile)
      const position = new vscode.Position(5, 17)

      const result = providers.pythonArrayCompletion.provideCompletionItems(document, position)

      assert.equal(result[0].insertText, '["HELLO"')
      assert.equal(result[0].label.label, 'HELLO')
      assert.equal(result[0].label.detail, ' World')
    })
  })

  describe('#javascriptHover', function () {
    it('returns undefined at 0 line', async function () {
      const javascriptFile = path.join(__dirname, '..', 'examples', 'javascript.js')
      const document = await vscode.workspace.openTextDocument(javascriptFile)
      const position = new vscode.Position(0, 22)

      const result = providers.javascriptHover.provideHover(document, position)

      assert.equal(result, undefined)
    })

    it('returns value at 0 line and correct position', async function () {
      const javascriptFile = path.join(__dirname, '..', 'examples', 'javascript.js')
      const document = await vscode.workspace.openTextDocument(javascriptFile)
      const position = new vscode.Position(0, 26)

      const result = providers.javascriptHover.provideHover(document, position)

      assert.equal(result.contents[0], 'World')
    })
  })

  describe('#rubyHover', function () {
    it('returns undefined at 0 line', async function () {
      const rubyFile = path.join(__dirname, '..', 'examples', 'ruby.rb')
      const document = await vscode.workspace.openTextDocument(rubyFile)
      const position = new vscode.Position(0, 9)

      const result = providers.rubyHover.provideHover(document, position)

      assert.equal(result, undefined)
    })

    it('returns value at 0 line and correct position', async function () {
      const rubyFile = path.join(__dirname, '..', 'examples', 'ruby.rb')
      const document = await vscode.workspace.openTextDocument(rubyFile)
      const position = new vscode.Position(0, 13)

      const result = providers.rubyHover.provideHover(document, position)

      assert.equal(result.contents[0], 'World')
    })
  })

  describe('#pythonHover', function () {
    it('returns undefined at 0 line for os.environ.get format', async function () {
      const pythonFile = path.join(__dirname, '..', 'examples', 'python.py')
      const document = await vscode.workspace.openTextDocument(pythonFile)
      const position = new vscode.Position(0, 19)

      const result = providers.pythonHover.provideHover(document, position)

      assert.equal(result, undefined)
    })

    it('returns value at 0 line and correct position for os.environ.get format', async function () {
      const pythonFile = path.join(__dirname, '..', 'examples', 'python.py')
      const document = await vscode.workspace.openTextDocument(pythonFile)
      const position = new vscode.Position(0, 23)

      const result = providers.pythonHover.provideHover(document, position)

      assert.equal(result.contents[0], 'World')
    })

    it('returns undefined at 0 line for os.getenv format', async function () {
      const pythonFile = path.join(__dirname, '..', 'examples', 'python.py')
      const document = await vscode.workspace.openTextDocument(pythonFile)
      const position = new vscode.Position(1, 13)

      const result = providers.pythonHover.provideHover(document, position)

      assert.equal(result, undefined)
    })

    it('returns value at 0 line and correct position for os.getenv format', async function () {
      const pythonFile = path.join(__dirname, '..', 'examples', 'python.py')
      const document = await vscode.workspace.openTextDocument(pythonFile)
      const position = new vscode.Position(1, 17)

      const result = providers.pythonHover.provideHover(document, position)

      assert.equal(result.contents[0], 'World')
    })

    it('returns undefined at 0 line for os.environ[] format', async function () {
      const pythonFile = path.join(__dirname, '..', 'examples', 'python.py')
      const document = await vscode.workspace.openTextDocument(pythonFile)
      const position = new vscode.Position(2, 14)

      const result = providers.pythonHover.provideHover(document, position)

      assert.equal(result, undefined)
    })

    it('returns value at 0 line and correct position for os.environ[] format', async function () {
      const pythonFile = path.join(__dirname, '..', 'examples', 'python.py')
      const document = await vscode.workspace.openTextDocument(pythonFile)
      const position = new vscode.Position(2, 18)

      const result = providers.pythonHover.provideHover(document, position)

      assert.equal(result.contents[0], 'World')
    })
  })
})
