import React from 'react'
import { LoadScript, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'
import { cx, css } from 'emotion'
import { ParagraphDisplay } from './ReusableComponents'
import { initialMarker, getLocationDetails } from '../utils/helpers'

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

function MapComponent({ addressData }) {
  const [currentPosition, setCurrentPosition] = React.useState({})
  const [markerDetails, setMarkerDetails] = React.useState(initialMarker)
  const [showDetails, setShowDetails] = React.useState(false)
  const { results, status } = addressData

  const setInputLocation = () => {
    const { lat, lng } = results[0].geometry.location
    const currentPosition = { lat: parseInt(lat), lng: parseInt(lng) }
    setCurrentPosition(currentPosition)
  }

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(setInputLocation)
  }, [])

  const handleClick = () => {
    const mark = getLocationDetails(results[0])
    setMarkerDetails({ ...mark })
    setShowDetails(true)
  }
  if (status !== 'OK') alert('Missing Location Data, please click the "Back" button')

  const defaultCenter = {
    lat: 52.520008,
    lng: 13.404954
  }

  return (
    <LoadScript googleMapsApiKey={process.env.API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={10}
        center={currentPosition.lat ? currentPosition : defaultCenter}
      >
        {currentPosition.lat && <Marker position={currentPosition} onClick={handleClick} />}

        {showDetails ? (
          <InfoWindow position={currentPosition} onCloseClick={() => setShowDetails(false)}>
            <div className={cx(infoDiv)}>
              <ParagraphDisplay
                leftOutput="Id"
                rightOutput={markerDetails.placeId}
                rightOutputStyles={infoSpan}
              />
              <ParagraphDisplay
                leftOutput="PostCode"
                rightOutput={markerDetails.postCode}
                rightOutputStyles={infoSpan}
              />
              <ParagraphDisplay
                leftOutput="Area"
                rightOutput={markerDetails.area}
                rightOutputStyles={infoSpan}
              />
              <ParagraphDisplay
                leftOutput="State"
                rightOutput={markerDetails.state}
                rightOutputStyles={infoSpan}
              />
              <ParagraphDisplay
                leftOutput="Country"
                rightOutput={markerDetails.country}
                rightOutputStyles={infoSpan}
              />
              <ParagraphDisplay
                leftOutput="Latitude"
                rightOutput={markerDetails.lat}
                rightOutputStyles={infoSpan}
              />
              <ParagraphDisplay
                leftOutput="Longitude"
                rightOutput={markerDetails.lng}
                rightOutputStyles={infoSpan}
              />
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MapComponent)
