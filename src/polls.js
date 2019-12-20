const pollData = require('./data/pollData')
const safeReturn = require('./safeReturn')
const blockBuilder = require('./blockBuilder')

const formatPollDisplay = ({ poll }) => {
  return [
    blockBuilder.titleBlock({ title: poll.title }),
    blockBuilder.divider(),
    ...Object.keys(poll.options).flatMap(optionKey =>
      blockBuilder.optionBlock({ option: poll.options[optionKey], optionKey })
    ),
  ]
}

const createOptionsObject = ({ options }) =>
  options.reduce((accum, curr, currentIndex) => {
    accum[currentIndex + 1] = {
      text: curr,
      votes: [],
    }
    return accum
  }, {})

const parseOptions = ({ optionsString }) => {
  const splitText = optionsString.split('”')

  if (splitText.length !== 2) {
    return safeReturn(
      new Error(
        'Poll not properly formatted. Please used "Poll Title Text" Option 1, Option 2...'
      )
    )
  }

  const title = splitText[0]
    .replace('“', '')
    .replace('”', '')
    .trim()

  const options = splitText[1].split(',').map(v => v.trim())

  return safeReturn(null, { title, options })
}

const create = async ({ channelId, optionsString }) => {
  if (!channelId) {
    return safeReturn(new Error('channelId is required'))
  }

  const pollResult = await pollData.findPoll({ channelId })

  if (pollResult.results !== null) {
    return safeReturn(new Error('Poll already exists for this channel'))
  }

  const parsedResults = parseOptions({ optionsString })

  if (parsedResults.error) {
    return safeReturn(parsedResults.error)
  }
  const { title, options } = parsedResults.results

  const poll = {
    channelId,
    title,
    options: createOptionsObject({ options }),
  }

  const saveResult = await pollData.savePoll({ channelId, data: poll })

  if (saveResult.error) {
    return safeReturn(new Error('Something went wrong saving poll'))
  }

  return safeReturn(null, poll)
}

const find = async ({ channelId }) => {
  if (!channelId) {
    return safeReturn(new Error('channelId is required'))
  }

  const pollResult = await pollData.findPoll({ channelId })

  if (pollResult.error !== null) {
    return safeReturn(new Error('No poll exists for this channel.'))
  }

  return safeReturn(null, pollResult.results)
}

const close = () => {}

module.exports = {
  create,
  find,
  formatPollDisplay,
  close,
}
