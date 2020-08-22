import React from 'react'
import { cx, css } from 'emotion'

const rootDiv = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

function App() {
  return <div className={cx(rootDiv)}>Testing Setup</div>
}

export default App
