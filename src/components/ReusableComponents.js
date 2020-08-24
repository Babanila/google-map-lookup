import React from 'react'
import { css, cx } from 'emotion'
import HeaderImage from '../assets/images/header_image.png'
import { splitString, getAddressPostCode } from '../utils/helpers'

export function LoadingPage() {
  const loadingStyle = css`
    width: 100%;
    height: 10em;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000000;
    margin-top: 10em;
  `
  return <h3 className={cx(loadingStyle)}>Loading ...</h3>
}

export function ErrorPage({ message }) {
  const errorStyle = css`
    width: 100%;
    height: 10em;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ff0000;
    margin-top: 10em;
  `

  return (
    <div className={cx(errorStyle)}>
      <h3>{!message ? 'Page not found!!!' : message}</h3>
    </div>
  )
}

export function PageHeader() {
  const pageHeaderDiv = css`
    width: 100%;
    height: 100px;
    background-color: #ffffff;
    border-bottom: 1px solid #f4f4f4;
    padding-left: 1em;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
  `

  const ImageDiv = css`
    width: 100%;
    height: 100%;
    background: transparent;
    display: flex;
    align-items: center;
  `
  return (
    <div className={cx(pageHeaderDiv)}>
      <div className={cx(ImageDiv)}>
        <img src={HeaderImage} alt="header-image" height="50px" />
      </div>
    </div>
  )
}

export function SingleButton({ btnName, btnClick, btnStyles }) {
  return (
    <button className={cx(btnStyles)} onClick={(e) => btnClick(e)}>
      {btnName}
    </button>
  )
}

export function SingleAddress({ id, singleDetails, onClick }) {
  const tableRowDiv = css`
    display: table-row;
    background-color: #f6f6f6;
    &:hover {
      background-color: #cee9ff;
    }
  `

  const tableCellDiv = css`
    display: table-cell;
    text-align: center;
    padding: 10px;
    border-bottom: 1px solid black;
  `

  const splitData = splitString(singleDetails, ',').filter((item) => item !== '')
  const address = getAddressPostCode(splitData)
  return (
    <div className={cx(tableRowDiv)} onClick={() => onClick(address)}>
      <div className={cx(tableCellDiv)}>{id}</div>
      <div className={cx(tableCellDiv)}>{splitData[0]}</div>
      <div className={cx(tableCellDiv)}>
        {`${splitData[1]}, ${splitData[2]} ${splitData[3] ? splitData[3] : ''}`}
      </div>
    </div>
  )
}

export function ParagraphDisplay({ leftOutput, rightOutput, rightOutputStyles }) {
  return (
    <p>
      {leftOutput}:{' '}
      <span className={cx(rightOutputStyles)}>
        {rightOutput !== undefined || rightOutput !== null ? rightOutput : ''}
      </span>
    </p>
  )
}
