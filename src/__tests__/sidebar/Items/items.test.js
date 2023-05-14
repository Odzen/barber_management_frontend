import { cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'
import Item from '../../../containers/sidebar/Item/index'

afterEach(() => {
  cleanup()
})

describe('testing to Item component', () => {
  test('should return Item component', () => {
    let text = 'Usuarios'
    let to = '/users'
    let svg = ''
    let open = true
    let classes = open ? 'linkOpen' : 'normal'

    let item = renderer
      .create(
        <MemoryRouter initialEntries={['/users/mjackson']}>
          <Item text={text} to={to} svg={svg} classes={classes} />
        </MemoryRouter>
      )
      .toJSON()

    expect(item).toMatchSnapshot()
  })
})
