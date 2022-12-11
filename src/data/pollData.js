const db = require('cyclic-dynamodb')
const safeReturn = require('./../safeReturn')
const extractPollData = require('./../extractPollData')
const POLL_COLLECTION = 'poll'

const findPoll = async ({ channelId }) => {
  try {
    const file = await db.collection(POLL_COLLECTION).get(channelId)
    if (file) {
      return safeReturn(null, extractPollData(file))
    } else {
      throw new Error('No poll exists for this channel.')
    }
  } catch (error) {
    console.error(error)
    return safeReturn(error)
  }
}

const savePoll = async ({ channelId, data }) => {
  try {
    await db.collection(POLL_COLLECTION).set(channelId, data)
    return safeReturn(null, true)
  } catch (error) {
    console.error(error)
    return safeReturn(error)
  }
}

const deletePoll = async ({ channelId }) => {
  try {
    const result = await db.collection(POLL_COLLECTION).delete(channelId)
    return safeReturn(null, result)
  } catch (error) {
    console.error(error)
    return safeReturn(error)
  }
}

module.exports = {
  findPoll,
  savePoll,
  deletePoll,
}
