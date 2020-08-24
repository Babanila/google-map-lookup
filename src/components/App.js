import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { cx, css } from 'emotion'
import AddressList from './AddressList'
import DisplayAddress from './DisplayAddress'
import { PageHeader, ErrorPage } from './ReusableComponents'

const rootDiv = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

function App() {
  return (
    <BrowserRouter className={cx(rootDiv)}>
      <PageHeader />
      <Switch>
        <Route exact path="/" render={(props) => <AddressList {...props} />} />
        <Route path="/location/:postcode" render={(props) => <DisplayAddress {...props} />} />
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
