const pollData = require('./data/pollData')
const safeReturn = require('./safeReturn')
const blockBuilder = require('./blockBuilder')

const _createOptionsObject = ({ options }) =>
  options.reduce((accum, curr, currentIndex) => {
    accum[currentIndex + 1] = {
      text: curr,
      votes: [],
    }
    return accum
  }, {})

const _parseOptions = ({ optionsString }) => {
  const splitText = optionsString
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .split('"')
    .filter((t) => t !== '')

  if (splitText.length !== 2) {
    return safeReturn(
      new Error(
        'Poll not properly formatted. Please used "Poll Title Text" Option 1, Option 2...'
      )
    )
  }

  const title = splitText[0].trim()

  const options = splitText[1].split(',').map((v) => v.trim())

  return safeReturn(null, { title, options })
}

const obfuscateVotes = ({ option }) => ({
  ...option,
  votes: option.votes.map(() => 'anon'),
})

const formatPollDisplay = ({ poll, userId }) => {
  const { title, anonymous, options, creatorId } = poll
  return [
    blockBuilder.titleBlock({ title: title }),
    blockBuilder.divider(),
    ...Object.keys(options).flatMap((optionKey) =>
      blockBuilder.optionBlock({
        option:
          anonymous && creatorId !== userId
            ? obfuscateVotes({ option: poll.options[optionKey] })
            : poll.options[optionKey],
        optionKey,
      })
    ),
  ]
}

const find = async ({ channelId }) => {
  if (!channelId) {
    return safeReturn(new Error('channelId is required'))
  }

  const { error, results } = await pollData.findPoll({ channelId })

  if (error !== null) {
    return safeReturn(new Error('No poll exists for this channel.'))
  }

  return safeReturn(null, { ...results, results })
}

const create = async ({ channelId, optionsString, creatorId, anonymous }) => {
  if (!channelId) {
    return safeReturn(new Error('channelId is required'))
  }

  const pollResult = await pollData.findPoll({ channelId })

  if (pollResult.results !== null) {
    return safeReturn(new Error('Poll already exists for this channel'))
  }

  const parsedResults = _parseOptions({ optionsString })

  if (parsedResults.error) {
    return safeReturn(parsedResults.error)
  }
  const { title, options } = parsedResults.results

  const poll = {
    channelId,
    creatorId,
    anonymous: anonymous || false,
    title,
    options: _createOptionsObject({ options }),
  }

  const saveResult = await pollData.savePoll({ channelId, data: poll })

  if (saveResult.error) {
    console.log(saveResult.error)
    return safeReturn(new Error('Something went wrong saving poll'))
  }

  return safeReturn(null, poll)
}

const close = async ({ channelId }) => {
  const pollResult = find({ channelId })

  if (pollResult.error) {
    return pollResult
  }

  const deleteResult = await pollData.deletePoll({ channelId })

  if (deleteResult.error) {
    console.log(deleteResult.error)
    return safeReturn(new Error('There was an issue closing this poll'))
  }

  return pollResult
}

module.exports = {
  create,
  find,
  formatPollDisplay,
  close,
}
