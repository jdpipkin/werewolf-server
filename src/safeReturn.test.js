const safeReturn = require('./safeReturn')

describe('safeReturn', () => {
  it('should return an object with error and null results if error is passed', () => {
    const mockError = new Error('Some Error')
    const expected = { error: mockError, results: null }

    const actual = safeReturn(mockError)

    expect(actual).toEqual(expected)
  })

  it('should return an object with null error and results if results are passed', () => {
    const expected = { error: null, results: 'Mock Results' }

    const actual = safeReturn(null, 'Mock Results')

    expect(actual).toEqual(expected)
  })
})
