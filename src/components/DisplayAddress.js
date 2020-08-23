import React from 'react'
import { cx, css } from 'emotion'
import { ErrorPage, LoadingPage } from './ReusableComponents'
import { simpleFetcher } from '../utils/helpers'
import MapComponent from './MapComponent'

const displayAddressDiv = css`
  margin-top: 6em;
  width: 100%;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`

const CACHE = {}

export function DisplayAddress({ match }) {
  const [locationData, setLocationData] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')

  const { postcode } = match.params
  const addressUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=${process.env.API_KEY}`

  React.useEffect(() => {
    getAddressDetails(addressUrl)
  }, [postcode, addressUrl])

  const getAddressDetails = async (url) => {
    try {
      if (CACHE[url] !== undefined) {
        setLocationData(CACHE[url])
        setLoading(false)
      } else {
        const { data } = await simpleFetcher(url)
        CACHE[url] = data
        setLocationData(data)
        setLoading(false)
      }
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  if (error) return <ErrorPage message={error} />
  if (loading) return <LoadingPage />

  return (
    <div className={cx(displayAddressDiv)} onClick={() => {}}>
      <MapComponent addressData={locationData} />
    </div>
  )
}

export default DisplayAddress
