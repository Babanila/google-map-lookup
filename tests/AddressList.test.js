import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import AddressList from '../src/components/AddressList'

describe('Check AddressList Component', () => {
  let sampleData

  beforeEach(() => {
    sampleData = [
      'Peter Schmidt,Bleibtreustraße 87,79865 Grafenhausen',
      'Dominik Koertig,Karl-Liebknecht-Strasse 14,28832 Achim',
      'Daniela Hertz,Grolmanstraße 82,82386 Huglfing'
    ]
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should renders component without crashing', () => {
    const tree = renderer.create(<AddressList />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render AddressList component without data', () => {
    const AddressListWrapper = mount(
      <MemoryRouter initialentries="{['/']}">
        <AddressList />
      </MemoryRouter>
    )

    const actualDiv = AddressListWrapper.find('MemoryRouter')
    const actualDiv1 = actualDiv.find('Router')
    const actualComponent = actualDiv1.find('AddressList')
    const actualDiv3 = actualComponent.find('LoadingPage')

    expect(AddressList).toBeDefined()
    expect(actualDiv.length).toEqual(1)
    expect(actualDiv1.length).toEqual(1)
    expect(actualComponent.length).toEqual(1)
    expect(actualDiv3.length).toEqual(1)
  })

  it('should render AddressList component data', () => {
    const setUserData = React.useState
    jest.spyOn(React, 'useState').mockImplementationOnce(() => setUserData([...sampleData]))

    const setLoading = React.useState
    jest.spyOn(React, 'useState').mockImplementationOnce(() => setLoading(false))

    const AddressListWrap = mount(
      <MemoryRouter initialentries="{['/']}">
        <AddressList />
      </MemoryRouter>
    )

    const actual1 = AddressListWrap.find('div')
    const actual2 = AddressListWrap.find('SingleAddress')
    const actual3 = actual2.children()
    const childDetails = actual3.at(0).simulate('click')

    expect(actual1.length).toEqual(20)
    expect(actual2.length).toEqual(3)
    expect(actual3.length).toEqual(3)
    expect(actual3.at(0).childAt(0).text()).toEqual('1')
    expect(actual3.at(0).childAt(1).text()).toEqual('Peter Schmidt')
    expect(actual3.at(1).childAt(0).text()).toEqual('2')
    expect(actual3.at(1).childAt(1).text()).toEqual('Dominik Koertig')
    expect(actual3.at(2).childAt(0).text()).toEqual('3')
    expect(actual3.at(2).childAt(1).text()).toEqual('Daniela Hertz')
    expect(childDetails.length).toEqual(1)
  })
})
