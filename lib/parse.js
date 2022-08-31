const main = function(sourceCode) {
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
          maskedText: '░'.repeat(firstMatch.length),
          start: { line: lineIndex, column: startIndex },
          end: { line: lineIndex, column: endIndex }
        })
      }
    }
  }

  return arr
}

module.exports.main = main
