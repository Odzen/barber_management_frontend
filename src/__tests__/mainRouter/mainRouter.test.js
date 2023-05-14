// import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'
import MainRouter from '../../containers/mainRouter'

describe('testing to MainRouter', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    })
  })

  test('should return MainRouter Component', () => {
    let mainRouter = renderer
      .create(
        <MemoryRouter initialEntries={['/users/mjackson']}>
          <MainRouter location={{ pathname: '/' }} />
        </MemoryRouter>
      )
      .toJSON()

    expect(mainRouter).toMatchSnapshot()
  })
})
