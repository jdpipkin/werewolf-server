const publicResponse = ({ text }) => ({
  response_type: 'in_channel',
  text,
})

const privateResponse = ({ text }) => ({
  response_type: 'ephemeral',
  text,
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
