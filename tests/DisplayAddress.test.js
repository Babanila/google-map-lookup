import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import DisplayAddress from '../src/components/DisplayAddress'

describe('Check DisplayAddress Component', () => {
  let sampleData, match

  beforeEach(() => {
    match = { params: { postcode: 90453 } }
    sampleData = {
      results: [
        {
          formatted_address: '90453 Nürnberg, Deutschland',
          geometry: {
            bounds: {
              northeast: { lat: 49.4012891, lng: 11.06465 },
              southwest: { lat: 49.35221, lng: 10.9925109 }
            },
            location: {
              lat: 49.3757248,
              lng: 11.0346054
            },
            location_type: 'APPROXIMATE',
            viewport: {
              northeast: { lat: 49.4012891, lng: 11.06465 },
              southwest: { lat: 49.35221, lng: 10.9925109 }
            }
          },
          place_id: 'ChIJ26TczgNRn0cRwEbF9DXaHhw',
          types: ['postal_code']
        }
      ],
      status: 'OK'
    }
  })

  it('should renders component without crashing', () => {
    const tree = renderer.create(<DisplayAddress match={match} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render DisplayAddress component without data', () => {
    const DisplayAddressWrapper = mount(
      <MemoryRouter initialentries="{['/']}">
        <DisplayAddress match={match} />
      </MemoryRouter>
    )

    const actualDiv = DisplayAddressWrapper.find('MemoryRouter')
    const actualDiv1 = actualDiv.find('Router')
    const actualComponent = actualDiv1.find('DisplayAddress')
    const actualDiv3 = actualComponent.find('LoadingPage')
    expect(DisplayAddress).toBeDefined()
    expect(actualDiv.length).toEqual(1)
    expect(actualDiv1.length).toEqual(1)
    expect(actualComponent.length).toEqual(1)
    expect(actualDiv3.length).toEqual(1)
  })

  it('should render DisplayAddress component data', () => {
    const setLocationData = React.useState
    jest.spyOn(React, 'useState').mockImplementationOnce(() => setLocationData({ ...sampleData }))

    const setLoading = React.useState
    jest.spyOn(React, 'useState').mockImplementationOnce(() => setLoading(false))

    const DisplayAddressWrap = mount(
      <MemoryRouter initialentries="{['/']}">
        <DisplayAddress match={match} />
      </MemoryRouter>
    )

    const actual1 = DisplayAddressWrap.find('div')
    const buttonComponent = DisplayAddressWrap.find('SingleButton')
    const mapComponent = DisplayAddressWrap.find('Memo(MapComponent)')
    expect(actual1.length).toEqual(4)
    expect(buttonComponent.length).toEqual(1)
    expect(mapComponent.length).toEqual(1)
  })
})
