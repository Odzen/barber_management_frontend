// import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import renderer from 'react-test-renderer'
import LoginView from '../../security/views/login/index'

const setToken = jest.fn()

describe('testing to LoginView', () => {
  test('should return LoginView Component', () => {
    // let login = renderer.create(<LoginView setToken={setToken} />).toJSON()

    // expect(login).toMatchSnapshot()
  })
})
