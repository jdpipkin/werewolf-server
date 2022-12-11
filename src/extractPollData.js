const R = require('ramda')

const extractPollData = (pollData) => {
  let _pollData = { ...pollData }
  if (pollData['props']) {
    _pollData = { ..._pollData.props }
  }

  return R.pick(
    ['channelId', 'creatorId', 'anonymous', 'title', 'options'],
    _pollData
  )
}

module.exports = extractPollData
