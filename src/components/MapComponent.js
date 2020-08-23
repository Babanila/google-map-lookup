import React from 'react'
import { LoadScript, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'
import { cx, css } from 'emotion'

const containerStyle = {
  width: '100%',
  maxWidth: '500px',
  height: '500px'
}

const infoDiv = css`
  height: auto;
  background: #ffffff;
  color: #000000;
  border: 1px solid #ccc;
  padding: 5px;
  display: flex;
  flex-direction: column;
  line-height: 0.05em;
`

const infoSpan = css`
  color: #36a7fe;
  font-style: italic;
`

const defaultCenter = {
  lat: 52.520008,
  lng: 13.404954
}

function MapComponent({ addressData }) {
  const [currentPosition, setCurrentPosition] = React.useState({})
  const [showDetails, setShowDetails] = React.useState(false)

  const { results, status } = addressData
  if (status !== 'OK') alert('Missing Location Data')

  const success = () => {
    const { lat, lng } = results[0].geometry.location
    const currentPosition = { lat, lng }
    setCurrentPosition(currentPosition)
  }

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  })

  const handleClick = () => {
    setShowDetails(true)
  }

  return (
    <LoadScript googleMapsApiKey={process.env.API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={13}
        center={currentPosition.lat ? currentPosition : defaultCenter}
      >
        {currentPosition.lat && <Marker position={currentPosition} onClick={() => handleClick()} />}

        {showDetails ? (
          <InfoWindow
            position={results[0].geometry.location}
            onCloseClick={() => setShowDetails(false)}
          >
            <div className={cx(infoDiv)}>
              <p>
                Id: <span className={cx(infoSpan)}> {results[0].place_id}</span>
              </p>
              <p>
                Address: <span className={cx(infoSpan)}> {results[0].formatted_address}</span>
              </p>
              <p>
                Location Type:
                <span className={cx(infoSpan)}> {results[0].geometry.location_type}</span>
              </p>
              <p>
                Latitude: <span className={cx(infoSpan)}> {results[0].geometry.location.lat}</span>
              </p>
              <p>
                Longitude: <span className={cx(infoSpan)}> {results[0].geometry.location.lng}</span>
              </p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MapComponent)
