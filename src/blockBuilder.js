const titleBlock = ({ title }) => ({
  type: 'section',
  text: {
    type: 'mrkdwn',
    text: `*${title}*`,
  },
})

const optionBlock = ({ option, optionKey }) => {
  return [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*${optionKey}* - ${option.text}`,
      },
    },
    {
      type: 'context',
      elements: [
        ...option.votes.map(voter => ({
          type: 'mrkdwn',
          text: `<@${voter}>`,
        })),
        {
          type: 'plain_text',
          text: option.votes.length
            ? `${option.votes.length} votes`
            : 'No votes',
        },
      ],
    },
  ]
}

const divider = () => ({ type: 'divider' })

module.exports = {
  titleBlock,
  optionBlock,
  divider,
}
