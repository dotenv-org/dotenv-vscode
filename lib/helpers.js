const dotenv = require('dotenv')

function envEntries () {
  const parsed = envParsed()

  if (parsed) {
    const entries = Object.entries(parsed) // converts key: value to [key, value]

    return entries
  } else {
    return [['KEY', 'VALUE']] // serves as example
  }
}

function envParsed () {
  const parsed = dotenv.config().parsed

  return parsed
}

module.exports.envEntries = envEntries
module.exports.envParsed = envParsed
