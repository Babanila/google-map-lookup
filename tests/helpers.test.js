import axios from 'axios'
const {
  splitString,
  getAddressPostCode,
  simpleFetcher,
  getLocationDetails
} = require('../src/utils/helpers')

describe('Check all the Utils functions', () => {
  jest.mock('axios')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Check splitString function', () => {
    it('should break input string using the symbol', () => {
      const sampleInput = 'Tina Tester,Testweg 123,123456 Teststadt'
      const result = splitString(sampleInput, ',')
      expect(splitString).toBeInstanceOf(Function)
      expect(result).toBeDefined()
      expect(result).toHaveLength(3)
      expect(result).toContain('Tina Tester')
      expect(result).toContain('Tina Tester', 'Testweg 123', '123456 Teststadt')
    })
  })

  describe('Check getAddressPostCode function', () => {
    it('should return the address post code', () => {
      const sampleAddress = ['Heike Berg', 'Marseiller Strasse 91', '82386 Huglfing']
      const result = getAddressPostCode(sampleAddress)
      expect(getAddressPostCode).toBeInstanceOf(Function)
      expect(result).toBeDefined()
      expect(result).toBe('82386')
    })

    it('should return post code for longer address', () => {
      const sampleAddress = [
        'Ulrich Herzog',
        'Postfach 12345',
        'Invalidenstrasse 8',
        '66919 Hermersberg'
      ]
      const result = getAddressPostCode(sampleAddress)
      expect(getAddressPostCode).toBeInstanceOf(Function)
      expect(result).toBeDefined()
      expect(result).toBe('66919')
    })
  })

  describe('Check simpleFetcher function', () => {
    let url, fileUrl, dataFromFile, dataFromFile2, dataFromApi, dataFromApi2
    const postcode = 33444
    const API_KEY = 'dummy-api-key'
    beforeEach(() => {
      url = `https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=${API_KEY}`
      fileUrl = '../data/testdaten.txt'

      dataFromApi = {
        data: {
          results: [
            {
              geometry: { location: {}, location_type: 'APPROXIMATE', viewport: {} },
              place_id: 'ChIJNR34-n-ruEcRIIQlq_9gJxw',
              types: ['postal_code']
            }
          ],
          status: 'OK'
        },
        status: 200,
        statusText: ''
      }

      dataFromApi2 = {
        data: {
          results: [],
          status: 'INVALID_REQUEST'
        },
        status: 400,
        statusText: ''
      }

      dataFromFile = {
        data: `
        Sandra Abendroth
        Fischerinsel 4
        41063 Mönchengladbach Eicken
        
        Tina Tester
        Testweg 123
        123456 Teststadt
        `,
        status: 200,
        statusText: 'OK'
      }

      dataFromFile2 = {
        data: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="utf-8">
        <title>Error</title>
        </head>
        <body>
        <pre>Cannot GET /data/testdaten.tx</pre>
        </body>
        </html>
        `,
        status: 404,
        statusText: 'Not Found'
      }
    })

    it('should get data successfully from the API', async () => {
      axios.mockImplementationOnce(() =>
        Promise.resolve({
          ...dataFromApi
        })
      )

      const results = await simpleFetcher(url)
      expect(axios).toHaveBeenCalled()
      expect(axios).toBeCalledWith(url)
      expect(axios).toHaveBeenCalledTimes(1)
      expect(results).toEqual({ ...dataFromApi })
    })

    it('should get data from file link/url successfully', async () => {
      axios.mockImplementationOnce(() =>
        Promise.resolve({
          ...dataFromFile
        })
      )
      const fileUrl = '../data/testdaten.txt'
      const results = await simpleFetcher(fileUrl)
      expect(axios).toHaveBeenCalled()
      expect(axios).toBeCalledWith(fileUrl)
      expect(axios).toHaveBeenCalledTimes(1)
      expect(results).toEqual({ ...dataFromFile })
    })

    it('should resolve with empty data for wrong API url call', async () => {
      axios.mockImplementationOnce(() =>
        Promise.resolve({
          ...dataFromApi2
        })
      )
      const wrongUrl = `https://maps.googleapis.com/maps/api/geocode/json?addre=${postcode}&key=${API_KEY}`
      const actual = await simpleFetcher(wrongUrl)
      expect(axios).toHaveBeenCalled()
      expect(axios).toBeCalledWith(wrongUrl)
      expect(axios).toHaveBeenCalledTimes(1)
      expect(actual.status).toEqual(400)
      expect(actual.data.results).toHaveLength(0)
      expect(actual.data.status).toBe('INVALID_REQUEST')
      expect(actual).toEqual({ ...dataFromApi2 })
    })

    it('should reject with wrong url for file', async () => {
      axios.mockImplementationOnce(() =>
        Promise.reject({
          response: { ...dataFromFile2 }
        })
      )
      const wrongFileUrl = '../data/testdaten.tx'
      const actual = await simpleFetcher(wrongFileUrl)
      expect(axios).toHaveBeenCalled()
      expect(axios).toBeCalledWith(wrongFileUrl)
      expect(axios).toHaveBeenCalledTimes(1)
      expect(actual.status).toEqual(404)
      expect(actual.statusText).toBe('Not Found')
      expect(actual).toEqual({ ...dataFromFile2 })
    })
  })

  describe('Check getLocationDetails function', () => {
    it('should extract placeId, lat, lng, postCode, area, state and country from passed data.', () => {
      const sampleData = {
        address_components: [
          {
            long_name: '41063',
            short_name: '41063',
            types: ['postal_code']
          },
          {
            long_name: 'Nord',
            short_name: 'Nord',
            types: ['political', 'sublocality', 'sublocality_level_1']
          },
          {
            long_name: 'Mönchengladbach',
            short_name: 'MG',
            types: ['locality', 'political']
          },
          {
            long_name: 'Düsseldorf',
            short_name: 'Düsseldorf',
            types: ['administrative_area_level_2', 'political']
          },
          {
            long_name: 'Nordrhein-Westfalen',
            short_name: 'NRW',
            types: ['administrative_area_level_1', 'political']
          },
          {
            long_name: 'Deutschland',
            short_name: 'DE',
            types: ['country', 'political']
          }
        ],
        place_id: 'ChIJNR34-n-ruEcRIIQlq_9gJxw',
        geometry: {
          location: {
            lat: 51.2076921,
            lng: 6.4227663
          }
        },
        formatted_address: '41063 Mönchengladbach, Deutschland'
      }

      const { placeId, lat, lng, postCode, area, state, country } = getLocationDetails(sampleData)
      expect(getLocationDetails).toBeInstanceOf(Function)
      expect(placeId).toBe('ChIJNR34-n-ruEcRIIQlq_9gJxw')
      expect(lat).toBe(51.2076921)
      expect(lng).toBe(6.4227663)
      expect(postCode).toBe('41063')
      expect(area).toBe('Düsseldorf')
      expect(state).toBe('Nordrhein-Westfalen')
      expect(country).toBe('Deutschland')
    })
  })
})
