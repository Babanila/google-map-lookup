import React from 'react'
import { useHistory } from 'react-router-dom'
import { cx, css } from 'emotion'
import { databaseUrl, splitString, simpleFetcher } from '../utils/helpers'
import { ErrorPage, LoadingPage, SingleAddress } from './ReusableComponents'

const userListDiv = css`
  margin-top: 6em;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 10;
`

const tableDiv = css`
  margin-top: 2em;
  width: 100%;
  max-width: 800px;
  display: table;
`

const tableTitleDiv = css`
  display: table-caption;
  font-size: 26px;
  font-weight: bold;
  padding-left: 10px;
  padding-bottom: 10px;
`

const tableHeaderDiv = css`
  display: table-cell;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid black;
  background-color: #f6f6f6;
  @media (max-width: 420px) {
    font-size: 16px;
  }
`

const tableBodyDiv = css`
  display: table-row-group;
`

const tableNullBody = css`
  display: table-caption;
  font-size: 20px;
  color: #ff0000;
`

function AddressList() {
  const [userData, setUserData] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    fetchData(databaseUrl)
  }, [databaseUrl])

  const fetchData = async (inputUrl) => {
    try {
      const results = await simpleFetcher(inputUrl)
      if (results.status === 200) {
        const filteredResults = await splitString(results.data.replace(/\n/g, ','), ',,')
        setUserData(filteredResults)
        setLoading(false)
      } else {
        setError(results.statusText)
        setLoading(false)
      }
    } catch (_) {}
  }

  const history = useHistory()
  const showDetailsOnMap = (addressCode) => history.push(`/location/${addressCode}`)

  if (error) return <ErrorPage message={error} />
  if (loading) return <LoadingPage />

  return (
    <div className={cx(userListDiv)}>
      <div className={cx(tableDiv)}>
        <div className={cx(tableTitleDiv)}>
          <div>Address List</div>
        </div>
        <div className={cx(tableHeaderDiv)}>No</div>
        <div className={cx(tableHeaderDiv)}>Name</div>
        <div className={cx(tableHeaderDiv)}>Address</div>

        {userData.length === 0 ? (
          <div className={cx(tableNullBody)}> No user Data is empty</div>
        ) : (
          <div className={cx(tableBodyDiv)}>
            {userData.map((item, i) => (
              <SingleAddress key={i} id={i + 1} singleDetails={item} onClick={showDetailsOnMap} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AddressList
