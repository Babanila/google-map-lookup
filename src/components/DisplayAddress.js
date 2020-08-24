import React from 'react'
import { useHistory } from 'react-router-dom'
import { cx, css } from 'emotion'
import { ErrorPage, LoadingPage, SingleButton } from './ReusableComponents'
import { simpleFetcher } from '../utils/helpers'
import MapComponent from './MapComponent'

const displayAddressDiv = css`
  margin-top: 6em;
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
`

const backButtonDiv = css`
  width: 100%;
  max-width: 500px;
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: transparent;
`

const backBtnStyle = css`
  padding: 10px;
  font-size: 1em;
  color: #ffffff;
  background-color: #36a7fe;
  border: 2px solid #36a7fe;
  border-radius: 5px;
  outline: none;
  &:hover {
    cursor: pointer;
    color: #36a7fe;
    background-color: #ffffff;
  }
`

const cache = {}

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
      if (cache[url]) {
        const data = await cache[url]
        setLocationData(data)
        setLoading(false)
      } else {
        const { data } = await simpleFetcher(url)
        cache[url] = data
        setLocationData(data)
        setLoading(false)
      }
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  const history = useHistory()
  const handleReturnBackHome = () => history.push(`/`)

  if (error) return <ErrorPage message={error} />
  if (loading) return <LoadingPage />

  return (
    <div className={cx(displayAddressDiv)} onClick={() => {}}>
      <div className={cx(backButtonDiv)}>
        <SingleButton btnName="Back" btnClick={handleReturnBackHome} btnStyles={backBtnStyle} />
      </div>
      <MapComponent addressData={locationData} />
    </div>
  )
}

export default DisplayAddress
