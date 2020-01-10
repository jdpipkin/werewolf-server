const pollsData = require('./data/pollData')
const polls = require('./polls')
const votes = require('./votes')

describe('vote', () => {
  let mockPoll
  beforeEach(() => {
    mockPoll = {
      channelId: '12345',
      title: 'Test Poll',
      options: {
        1: {
          text: 'Option 1',
          votes: [],
        },
        2: {
          text: 'Option 2',
          votes: [],
        },
      },
    }
  })
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should add a vote to the votes array for a given option', async () => {
    //arrange
    const expected = {
      channelId: '12345',
      title: 'Test Poll',
      options: {
        1: {
          text: 'Option 1',
          votes: [],
        },
        2: {
          text: 'Option 2',
          votes: ['U1234'],
        },
      },
    }

    jest
      .spyOn(polls, 'find')
      .mockImplementation(() =>
        Promise.resolve({ error: null, results: mockPoll })
      )

    jest
      .spyOn(pollsData, 'savePoll')
      .mockImplementation(() => Promise.resolve({ error: null, results: true }))

    // act
    const actual = await votes.vote({
      channelId: '12345',
      userId: 'U1234',
      optionsString: '2',
    })

    expect(actual.results).toEqual(expected)
  })

  it('should return an error result if poll does not exist', async () => {
    //arrange
    const expected = { error: new Error('Mock Error'), results: null }

    jest
      .spyOn(polls, 'find')
      .mockImplementation(() => Promise.resolve(expected))

    // act
    const actual = await votes.vote({
      channelId: '12345',
      userId: 'U1234',
      optionsString: '2',
    })

    expect(actual).toEqual(expected)
  })
})
