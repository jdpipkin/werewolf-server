const poll = require('./polls')
const pollData = require('./data/pollData')

describe('createPoll', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should should return a poll object if all went well', async () => {
    // arrange
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
          votes: [],
        },
      },
    }

    jest
      .spyOn(pollData, 'findPoll')
      .mockImplementation(() =>
        Promise.resolve({ error: 'Mock Error', results: null })
      )

    jest
      .spyOn(pollData, 'savePoll')
      .mockImplementation(() => Promise.resolve({ error: null, results: true }))

    const optionsString = '“Test Poll” Option 1, Option 2'

    // act
    const actual = await poll.create({ channelId: '12345', optionsString })
    // assert
    expect(actual.results).toEqual(expected)
  })

  it('should return an error if a channelId is undefined', async () => {
    // arrange
    jest
      .spyOn(pollData, 'findPoll')
      .mockImplementation(() => Promise.resolve({ error: null, results: {} }))

    // act
    const actual = await poll.create({
      channelId: undefined,
      optionsString: 'does not matter',
    })
    // assert
    expect(actual.error.message).toBe('channelId is required')
  })

  it('should return an error if a poll is found', async () => {
    // arrange
    jest
      .spyOn(pollData, 'findPoll')
      .mockImplementation(() =>
        Promise.resolve({ error: null, results: { something: '1234' } })
      )

    // act
    const actual = await poll.create({
      channelId: '12345',
      optionsString: 'does not matter',
    })

    // assert
    expect(actual.error.message).toBe('Poll already exists for this channel')
  })

  it('should return an error if options are not property formatted', async () => {
    // arrange
    jest
      .spyOn(pollData, 'findPoll')
      .mockImplementation(() =>
        Promise.resolve({ error: 'Mock Error', results: null })
      )

    // act
    const actual = await poll.create({
      channelId: '12345',
      optionsString: 'does not matter',
    })

    // assert
    expect(actual.error.message).toBe(
      'Poll not properly formatted. Please used "Poll Title Text" Option 1, Option 2...'
    )
  })

  it('should return an error if save fails', async () => {
    // arrange
    const optionsString = '“Test Poll” Option 1, Option 2'

    jest
      .spyOn(pollData, 'findPoll')
      .mockImplementation(() =>
        Promise.resolve({ error: 'Mock Error', results: null })
      )

    jest
      .spyOn(pollData, 'savePoll')
      .mockImplementation(() =>
        Promise.resolve({ error: 'Some Error', results: true })
      )

    // act
    const actual = await poll.create({
      channelId: '12345',
      optionsString,
    })

    // assert
    expect(actual.error.message).toBe('Something went wrong saving poll')
  })
})
