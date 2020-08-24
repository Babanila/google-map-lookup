import '@testing-library/jest-dom/extend-expect'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// React 16 Enzyme adapter
configure({ adapter: new Adapter() })

// Navigator Mock
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn()
}

global.navigator.geolocation = mockGeolocation
