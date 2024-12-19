import { initializeConnector, Web3ReactHooks } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { WalletConnect } from '@web3-react/walletconnect'
import { Network } from '@web3-react/network'

export const CHAIN_IDS = {
  // testnet: 245022940,
  'sol-devnet': 245022927,
  'devnet': 245022926
}

const URLS = {
  111: 'LOCAL',
  245022926: 'devnet',
  245022927: 'sol-devnet',
  245022940: 'testnet',
  245022934: 'mainnet-beta'
}

export const [network, networkHooks] = initializeConnector<Network>(
  (actions) => new Network({ actions, urlMap: URLS })
)
export const [metaMask, metaMaskHooks] = initializeConnector<MetaMask>(
  (actions) => new MetaMask({ actions })
)
export const [walletConnect, walletConnectHooks] = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect({
      actions,
      options: {
        rpc: URLS
      }
    })
)
