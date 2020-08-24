import React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import App from '../src/components/App'

describe('Check App Component', () => {
  it('should renders App without crashing', () => {
    const tree = shallow(<App />)
    expect(tree).toMatchSnapshot()
  })

  it('should render App component with data', () => {
    const AppWrapper = mount(
      <MemoryRouter initialentries="{['/']}">
        <App />
      </MemoryRouter>
    )

    const actualMemoryRouter = AppWrapper.find('MemoryRouter')
    const actualRouter = actualMemoryRouter.find('Router')
    const actualComponent = actualRouter.find('div')

    expect(AppWrapper).toBeDefined()
    expect(actualMemoryRouter.length).toEqual(1)
    expect(actualRouter.length).toEqual(1)
    expect(actualComponent.length).toEqual(3)
  })
})
