var crypto = require('crypto')

const validateRequest = (req, res, next) => {
  const {
    'x-slack-request-timestamp': timestamp,
    'x-slack-signature': slackSignature,
  } = req.headers
  const currentTime = Math.floor(Date.now() / 1000)

  // Make sure request happened in the last 5 minutes
  if (Math.abs(currentTime - timestamp) > 60 * 5) {
    return res.status(403).send('Forbidden')
  }

  const hashedToken = `v0=${crypto
    .createHmac('sha256', process.env.SIGNING_SECRET)
    .update(`v0:${timestamp}:${req.rawBody}`)
    .digest('hex')}`

  if (slackSignature === hashedToken) {
    return next()
  }

  return res.status(403).send('Forbidden')
}

module.exports = validateRequest
