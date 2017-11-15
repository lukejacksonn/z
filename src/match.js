const deepEqual = require('deep-equal')
const option = require('./option')

module.exports = (match, subjectToMatch) => {
  const hasMatchValue = match.args[0].length >= 2
  if (!hasMatchValue) {
    return option.Some(subjectToMatch)
  }

  const matchValue = match.args[0][1]

  // if is a type check, check type
  if (matchValue === Boolean && typeof subjectToMatch === 'boolean') {
    return option.Some(subjectToMatch)
  }
  if (matchValue === undefined && typeof subjectToMatch === 'undefined') {
    return option.Some(subjectToMatch)
  }
  if (matchValue === Number && typeof subjectToMatch === 'number') {
    return option.Some(subjectToMatch)
  }
  if (matchValue === String && typeof subjectToMatch === 'string') {
    return option.Some(subjectToMatch)
  }
  if (matchValue === Object && typeof subjectToMatch === 'object') {
    return option.Some(subjectToMatch)
  }

  // if is instance check, check instance
  if (
    typeof matchValue === 'function' &&
    subjectToMatch instanceof matchValue
  ) {
    return option.Some(subjectToMatch)
  }

  // if is object or array check, check deep equality
  if (typeof subjectToMatch === 'object' && subjectToMatch !== null) {
    if (deepEqual(subjectToMatch, matchValue)) {
      return option.Some(subjectToMatch)
    }
  }

  // if is value check, check value
  if (subjectToMatch === matchValue) {
    return option.Some(subjectToMatch)
  }

  return option.None
}
