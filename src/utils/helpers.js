import axios from 'axios'

export const databaseUrl = '../data/testdaten.txt'

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
