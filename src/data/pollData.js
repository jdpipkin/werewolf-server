const fs = require('fs').promises
const safeReturn = require('./../safeReturn')
const findPoll = async ({ channelId }) => {
  try {
    const file = await fs.readFile(`./db/${channelId}.json`)
    return safeReturn(null, JSON.parse(file))
  } catch (error) {
    console.error(error)
    return safeReturn(error)
  }
}

const savePoll = async ({ channelId, data }) => {
  try {
    await fs.writeFile(`./db/${channelId}.json`, JSON.stringify(data))
    return safeReturn(null, true)
  } catch (error) {
    console.error(error)
    return safeReturn(error)
  }
}

const deletePoll = async ({ channelId }) => {
  try {
    await fs.unlink(`./db/${channelId}`)
    return safeReturn(null, true)
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
