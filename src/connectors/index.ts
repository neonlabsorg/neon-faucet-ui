import { InjectedConnector } from '@web3-react/injected-connector'
export const CHAIN_IDS = {
  'testnet': 245022940,
  'devnet': 245022926
}
const supportedChainIds = []

Object.keys(CHAIN_IDS).forEach(key => supportedChainIds.push( CHAIN_IDS[key] ))
console.log(supportedChainIds)
export const injected = new InjectedConnector({ supportedChainIds })