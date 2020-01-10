const publicResponse = ({ text, blocks }) => ({
  response_type: 'in_channel',
  text,
  blocks: blocks && JSON.stringify(blocks),
})

const privateResponse = ({ text, blocks }) => ({
  response_type: 'ephemeral',
  text,
  blocks: blocks && JSON.stringify(blocks),
})

const errorResponse = ({ error }) => ({
  response_type: 'ephemeral',
  text: error.message || 'Something went wrong.',
})

module.exports = {
  publicResponse,
  privateResponse,
  errorResponse,
}
