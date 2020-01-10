const safeReturn = (error, results) =>
  error ? { error, results: null } : { error: null, results }

module.exports = safeReturn
