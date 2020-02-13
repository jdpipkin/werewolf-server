const blockBuilder = require('./blockBuilder')

describe('blockBuilder', () => {
  describe('optionBlock', () => {
    it('should return options with no vote text', () => {
      const mockOptions = {
        text: 'Person 1',
        votes: [],
      }

      const expected = [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*1* - Person 1`,
          },
        },
      ]

      const actual = blockBuilder.optionBlock({
        option: mockOptions,
        optionKey: 1,
      })

      expect(actual).toEqual(expected)
    })

    it('should return options with voter information if exists', () => {
      const mockOptions = {
        text: 'Person 1',
        votes: ['U1234', 'U5678'],
      }

      const expected = [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*1* - Person 1`,
          },
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `<@U1234>`,
            },
            {
              type: 'mrkdwn',
              text: `<@U5678>`,
            },
            {
              type: 'plain_text',
              text: '2 votes',
            },
          ],
        },
      ]

      const actual = blockBuilder.optionBlock({
        option: mockOptions,
        optionKey: 1,
      })

      expect(actual).toEqual(expected)
    })
  })
})
