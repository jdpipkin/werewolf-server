const responses = require('./slackResponses')

describe('publicResponse', () => {
  it('should return a response object with in_channel as the response_type', () => {
    const mockText = '12345'
    const expected = {
      response_type: 'in_channel',
      text: mockText,
    }

    const actual = responses.publicResponse({ text: mockText })

    expect(actual).toEqual(expected)
  })
})

describe('privateResponse', () => {
  it('should return a response object with ephemeral as the response_type', () => {
    const mockText = '12345'
    const expected = {
      response_type: 'ephemeral',
      text: mockText,
    }

    const actual = responses.privateResponse({ text: mockText })

    expect(actual).toEqual(expected)
  })
})

describe('errorResponse', () => {
  it('should return a response object with ephemeral as the response_type and error message as text', () => {
    const mockError = new Error('mockError')
    const expected = {
      response_type: 'ephemeral',
      text: mockError.message,
    }

    const actual = responses.errorResponse({ error: mockError })

    expect(actual).toEqual(expected)
  })

  it('should return a response object with ephemeral as the response_type and generic error message if error message is falsey', () => {
    const mockError = new Error('')
    const expected = {
      response_type: 'ephemeral',
      text: 'Something went wrong.',
    }

    const actual = responses.errorResponse({ error: mockError })

    expect(actual).toEqual(expected)
  })
})
