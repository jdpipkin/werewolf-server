const titleBlock = ({ title }) => ({
  type: 'section',
  text: {
    type: 'mrkdwn',
    text: `*${title}*`,
  },
})

const optionBlock = ({ option, optionKey }) => {
  const block = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*${optionKey}* - ${option.text}`,
      },
    },
  ]

  if (option.votes.length) {
    const voterFormatted = option.votes.map(v => `<@${v}>`)
    block.push({
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: voterFormatted.join(', '),
        },
        {
          type: 'plain_text',
          text: `${option.votes.length} votes`,
        },
      ],
    })
  }

  return block
}

const divider = () => ({ type: 'divider' })

module.exports = {
  titleBlock,
  optionBlock,
  divider,
}
