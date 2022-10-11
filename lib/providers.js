const vscode = require('vscode')

const helpers = require('./helpers')

const javascriptHover = {
  provideHover: function (document, position, token) {
    return helpers.hover('javascript', document, position)
  }
}

const rubyHover = {
  provideHover: function (document, position, token) {
    return helpers.hover('ruby', document, position)
  }
}

const pythonHover = {
  provideHover: function (document, position, token) {
    return helpers.hover('python', document, position)
  }
}

const phpHover = {
  provideHover: function (document, position, token) {
    return helpers.hover('php', document, position)
  }
}

const goHover = {
  provideHover: function (document, position, token) {
    return helpers.hover('go', document, position)
  }
}

const javaHover = {
  provideHover: function (document, position, token) {
    return helpers.hover('java', document, position)
  }
}

const csharpHover = {
  provideHover: function (document, position, token) {
    return helpers.hover('csharp', document, position)
  }
}
const javascriptCompletion = {
  provideCompletionItems: function (document, position) {
    const linePrefix = document.lineAt(position).text.slice(0, position.character)
    if (!linePrefix.endsWith('process.env.')) {
      return undefined
    }

    return helpers.autocomplete('.', document, position)
  }
}

const rubyCompletion = {
  provideCompletionItems: function (document, position) {
    const linePrefix = document.lineAt(position).text.slice(0, position.character)
    if (!linePrefix.endsWith('ENV[')) {
      return undefined
    }

    return helpers.autocomplete('[', document, position)
  }
}

const pythonCompletion = {
  provideCompletionItems: function (document, position) {
    const linePrefix = document.lineAt(position).text.slice(0, position.character)
    if (!linePrefix.endsWith('os.environ.get(') && !linePrefix.endsWith('os.getenv(')) {
      return undefined
    }

    return helpers.autocomplete('(', document, position)
  }
}

const pythonArrayCompletion = {
  provideCompletionItems: function (document, position) {
    const linePrefix = document.lineAt(position).text.slice(0, position.character)
    if (!linePrefix.endsWith('os.environ[')) {
      return undefined
    }

    return helpers.autocomplete('[', document, position)
  }
}

const phpCompletion = {
  provideCompletionItems: function (document, position) {
    const linePrefix = document.lineAt(position).text.slice(0, position.character)
    if (!linePrefix.endsWith('$_SERVER[') && !linePrefix.endsWith('$_ENV[')) {
      return undefined
    }

    return helpers.autocomplete('[', document, position)
  }
}

const phpGetEnvCompletion = {
  provideCompletionItems: function (document, position) {
    const linePrefix = document.lineAt(position).text.slice(0, position.character)
    if (!linePrefix.endsWith('getenv(')) {
      return undefined
    }

    return helpers.autocomplete('(', document, position)
  }
}

const goCompletion = {
  provideCompletionItems: function (document, position) {
    const linePrefix = document.lineAt(position).text.slice(0, position.character)
    if (!linePrefix.endsWith('os.Getenv(')) {
      return undefined
    }

    return helpers.autocomplete('(', document, position)
  }
}

const javaCompletion = {
  provideCompletionItems: function (document, position) {
    const linePrefix = document.lineAt(position).text.slice(0, position.character)
    if (!linePrefix.endsWith('dotenv.get(')) {
      return undefined
    }

    return helpers.autocomplete('(', document, position)
  }
}

const csharpCompletion = {
  provideCompletionItems: function (document, position) {
    const linePrefix = document.lineAt(position).text.slice(0, position.character)
    if (!linePrefix.endsWith('Environment.GetEnvironmentVariable(')) {
      return undefined
    }

    return helpers.autocomplete('(', document, position)
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
module.exports.rubyHover = rubyHover
module.exports.pythonHover = pythonHover
module.exports.phpHover = phpHover
module.exports.goHover = goHover
module.exports.javaHover = javaHover
module.exports.csharpHover = csharpHover
module.exports.javascriptCompletion = javascriptCompletion
module.exports.rubyCompletion = rubyCompletion
module.exports.pythonCompletion = pythonCompletion
module.exports.pythonArrayCompletion = pythonArrayCompletion
module.exports.phpCompletion = phpCompletion
module.exports.phpGetEnvCompletion = phpGetEnvCompletion
module.exports.goCompletion = goCompletion
module.exports.javaCompletion = javaCompletion
module.exports.csharpCompletion = csharpCompletion
module.exports.viewDotenvNew = viewDotenvNew
