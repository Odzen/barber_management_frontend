// import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import renderer from 'react-test-renderer'
import ErrorView from '../../../security/views/error'

describe('testing to ErrorView', () => {
  test('should return ErrorView Component', () => {
    let error = renderer.create(<ErrorView />).toJSON()

    expect(error).toMatchSnapshot()
  })
})
