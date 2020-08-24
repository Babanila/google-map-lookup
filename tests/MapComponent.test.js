import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import createGoogleMapsMock from 'jest-google-maps-mock'
import MapComponent from '../src/components/MapComponent'

describe('Check MapComponent Component', () => {
  let sampleData, googleMaps, process, props

  beforeEach(() => {
    googleMaps = createGoogleMapsMock()
    process = { env: { API_KEY: 'dummy-api-key-for-testing' } }
    props = { process }
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

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should renders component without crashing', () => {
    const tree = renderer.create(<MapComponent addressData={sampleData} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render MapComponent component without data', () => {
    const MapComponentWrapper = mount(
      <MemoryRouter initialentries="{['/']}">
        <MapComponent addressData={sampleData} {...props} />
      </MemoryRouter>
    )

    const actualDiv = MapComponentWrapper.find('MemoryRouter')
    const actualDiv1 = actualDiv.find('Router')
    const actualComponent = actualDiv1.find('LoadScript')
    const childrenComponent = actualComponent.children()

    expect(MapComponent).toBeDefined()
    expect(actualDiv.length).toEqual(1)
    expect(actualDiv1.length).toEqual(1)
    expect(actualComponent.length).toEqual(1)
    expect(childrenComponent.length).toEqual(2)
    expect(childrenComponent.find('div').length).toEqual(2)
    expect(childrenComponent.find('div').at(1).childAt(0).text()).toEqual('Loading...')
  })

  it('should render MapComponent component with data', () => {
    const setCurrentPosition = React.useState

    jest.spyOn(React, 'useState').mockImplementationOnce(() =>
      setCurrentPosition({
        lat: 49.3757248,
        lng: 11.0346054
      })
    )

    const MapComponentWrap = mount(
      <MemoryRouter initialentries="{['/']}">
        <MapComponent addressData={{ ...sampleData }} />
      </MemoryRouter>
    )

    new googleMaps.Map(MapComponentWrap)
    const actualLoadScript = MapComponentWrap.find('LoadScript')

    expect(actualLoadScript.length).toEqual(1)
    expect(googleMaps.Map).toHaveBeenCalledTimes(1)
    expect(googleMaps.Map.mock.instances.length).toBe(1)
    expect(googleMaps.Map).toHaveBeenLastCalledWith(MapComponentWrap)
  })
})
