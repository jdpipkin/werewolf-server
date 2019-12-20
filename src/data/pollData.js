const fs = require('fs').promises

const findPoll = async ({ channelId }) => {
  try {
    const file = await fs.readFile(`./db/${channelId}.json`)
    return { error: null, result: JSON.parse(data) }
  } catch (error) {
    console.error(error)
    return { error, result: null }
  }
}

const savePoll = async ({ channelId, data }) => {
  try {
    await fs.writeFile(`./db/${channelId}.json`, JSON.stringify(data))
    return { error: null, result: true }
  } catch (error) {
    console.error(error)
    return { error, result: null }
  }
}

const deletePoll = async ({ channelId }) => {
  try {
    await fs.unlink('./db/${channelId}')
    return { error: null, result: true }
  } catch (error) {
    console.error(error)
    return { error, result: null }
  }
}

module.exports = {
  findPoll,
  savePoll,
  deletePoll,
}
