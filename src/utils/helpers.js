import axios from 'axios'

export const databaseUrl = '../data/testdaten.txt'

export const initialMarker = {
  placeId: '',
  lat: '',
  lng: '',
  postCode: '',
  area: '',
  state: '',
  country: ''
}

export function splitString(inputString, inputSymbol) {
  return inputString.split(`${inputSymbol}`)
}

export function getAddressPostCode(parsedAddress) {
  return parsedAddress.length > 3
    ? splitString(parsedAddress[3], ' ')[0]
    : splitString(parsedAddress[2], ' ')[0]
}

export async function simpleFetcher(url) {
  try {
    const retrievedData = await axios(url)
    return retrievedData
  } catch (error) {
    return error.response
  }
}

export function getLocationDetails(parsedData) {
  const placeId = parsedData.place_id
  const { lat, lng } = parsedData.geometry.location
  const addrGroup = parsedData.address_components
  const postCode = addrGroup[0].long_name
  const area = addrGroup[addrGroup.length - 3].long_name
  const state = addrGroup[addrGroup.length - 2].long_name
  const country = addrGroup[addrGroup.length - 1].long_name
  return { placeId, lat, lng, postCode, area, state, country }
}
