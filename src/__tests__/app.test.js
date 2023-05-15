// import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'
import renderer from 'react-test-renderer'

describe('testing to App', () => {
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

  test('should return App Component', () => {
    let app = renderer
      .create(
        <MemoryRouter initialEntries={['/users/mjackson']}>
          <App location={{ pathname: '/' }} />
        </MemoryRouter>
      )
      .toJSON()
    expect(app).toMatchSnapshot()
  })
})
