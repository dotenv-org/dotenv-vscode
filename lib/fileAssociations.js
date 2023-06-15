const settings = require('./settings')

const run = function () {
  settings.populateFileAssociations()

  return true
}

module.exports.run = run
