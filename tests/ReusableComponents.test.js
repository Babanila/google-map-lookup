import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { css } from 'emotion'
import {
  LoadingPage,
  ErrorPage,
  PageHeader,
  SingleButton,
  SingleAddress,
  ParagraphDisplay
} from '../src/components/ReusableComponents'

describe('Check all components in ReusableComponents file', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Check LoadingPage Component', () => {
    it('should renders without crashing', () => {
      const tree = renderer.create(<LoadingPage />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('should render correct number of element in LoadingPage component', () => {
      const LoadingPageWrapper = shallow(<LoadingPage />)
      const actual = LoadingPageWrapper.find('h3')
      expect(LoadingPage).toBeDefined()
      expect(actual.exists).toBeTruthy()
      expect(actual.length).toEqual(1)
      expect(actual.text()).toEqual('Loading ...')
    })
  })

  describe('Check ErrorPage Component', () => {
    it('should renders without crashing', () => {
      const tree = renderer.create(<ErrorPage />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('should render correct number of element in ErrorPage component', () => {
      const ErrorPageWrapper = shallow(<ErrorPage />)
      expect(ErrorPage).toBeDefined()
      expect(ErrorPageWrapper.find('div').length).toEqual(1)
      expect(ErrorPageWrapper.find('h3').length).toEqual(1)
      expect(ErrorPageWrapper.find('h3').text()).toEqual('Page not found!!!')
    })

    it('should render the correct message passed', () => {
      const ErrorPageWrapper = shallow(<ErrorPage message="Not Found" />)
      expect(ErrorPage).toBeDefined()
      expect(ErrorPageWrapper.find('div').length).toEqual(1)
      expect(ErrorPageWrapper.find('h3').length).toEqual(1)
      expect(ErrorPageWrapper.find('h3').text()).toEqual('Not Found')
    })
  })

  describe('Check PageHeader Component', () => {
    it('should renders without crashing', () => {
      const tree = renderer.create(<PageHeader />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('should render correct number of element in PageHeader component', () => {
      const PageHeaderWrapper = shallow(<PageHeader />)
      expect(PageHeader).toBeDefined()
      expect(PageHeaderWrapper.exists).toBeTruthy()
      expect(PageHeaderWrapper.find('div').length).toEqual(2)
      expect(PageHeaderWrapper.find('img').length).toEqual(1)
    })
  })

  describe('Check SingleButton Component', () => {
    let btnName, handleClick, btnStyles
    beforeEach(() => {
      btnName = 'Back'
      handleClick = jest.fn()
      btnStyles = css`
        font-size: 1em;
        color: #ffffff;
        background-color: #36a7fe;
      `
    })

    it('should renders without crashing', () => {
      const tree = renderer
        .create(<SingleButton btnName={btnName} btnClick={handleClick} btnStyles={btnStyles} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('should render correct number of element in SingleButton component', () => {
      const SingleButtonWrapper = shallow(
        <SingleButton btnName={btnName} btnClick={handleClick} btnStyles={btnStyles} />
      )

      const actual = SingleButtonWrapper.find('button')
      expect(SingleButton).toBeDefined()
      expect(actual.exists).toBeTruthy()
      expect(actual.length).toEqual(1)
      expect(actual.at(0).text()).toContain('Back')
    })
  })

  describe('Check SingleAddress Component', () => {
    let id, sampleData, handleClick

    beforeEach(() => {
      id = 3
      handleClick = jest.fn()
      sampleData = 'Sandra Abendroth,Fischerinsel 4,41063 Mönchengladbach Eicken'
    })

    it('should renders without crashing', () => {
      const tree = renderer
        .create(<SingleAddress id={id} singleDetails={sampleData} onClick={handleClick} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('should render correct number of element in SingleAddress component', () => {
      const SingleAddressWrapper = shallow(
        <SingleAddress id={id} singleDetails={sampleData} onClick={handleClick} />
      )

      const actual = SingleAddressWrapper.find('div')
      expect(SingleAddress).toBeDefined()
      expect(actual.exists).toBeTruthy()
      expect(actual.length).toEqual(4)
      expect(actual.at(0).childAt(0).text()).toEqual('3')
      expect(actual.at(0).childAt(1).text()).toEqual('Sandra Abendroth')
      expect(actual.at(0).childAt(2).text()).toEqual(
        'Fischerinsel 4, 41063 Mönchengladbach Eicken '
      )
    })
  })

  describe('Check paragraphDisplay Component', () => {
    let leftOutput, rightOutput, rightOutputStyles
    beforeEach(() => {
      leftOutput = 'State'
      rightOutput = 'Deutschland'
      rightOutputStyles = css`
        color: #36a7fe;
        font-style: italic;
      `
    })

    it('should renders without crashing', () => {
      const tree = renderer
        .create(
          <ParagraphDisplay
            leftOutput={leftOutput}
            rightOutput={rightOutput}
            rightOutputStyles={rightOutputStyles}
          />
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('should render correct number of element in paragraphDisplay component', () => {
      const ParagraphDisplayWrapper = shallow(
        <ParagraphDisplay
          leftOutput={leftOutput}
          rightOutput={rightOutput}
          rightOutputStyles={rightOutputStyles}
        />
      )

      expect(ParagraphDisplay).toBeDefined()
      expect(ParagraphDisplayWrapper.exists).toBeTruthy()
      expect(ParagraphDisplayWrapper.find('p').length).toEqual(1)
      expect(ParagraphDisplayWrapper.find('p').text()).toEqual('State: Deutschland')
      expect(ParagraphDisplayWrapper.find('span').length).toEqual(1)
      expect(ParagraphDisplayWrapper.find('span').text()).toEqual('Deutschland')
    })
  })
})
