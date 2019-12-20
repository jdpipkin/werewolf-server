const pollData = require('./data/pollData')

const create = async ({ channelId, optionsString }) => {
  const pollResult = await pollData.findPoll({ channelId })
  if (pollResult.result) {
    return 'Poll already created'
  }
  const poll = {
    channelId,
    title: optionsString,
    optoins: optionsString,
  }

  const saveResult = await pollData.savePoll({ channelId, data: poll })

  if (saveResult.error) {
    return 'something went wrong'
  }

  return poll
  // check if poll exists
  //
}

const close = () => {}

module.exports = {
  create,
  close,
}
