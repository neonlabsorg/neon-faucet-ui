import Bowser from 'bowser'

export const FAUCET_URL = import.meta.env.NODE_ENV === 'development' ? '' : `https://api.${window.location.hostname}`

export const REQUEST_LIMIT_SEC = 60

export const isMobile = () => {
  const browser = Bowser.parse(window.navigator.userAgent)
  return browser.platform.type === 'mobile'
}
