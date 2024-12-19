import { Web3ReactProvider } from '@web3-react/core'

import { isMobile } from './config'
import Layout from './components/common/Layout'
import Button from './components/common/Button'
import { ReactComponent as MobileErrorIcon } from './assets/mobile-error.svg'
import TokenGetter from './components/TokenGetter'
import CookieBanner from './components/CookieBanner'
import { TokensProvider } from './contexts/tokens'
import { Web3ReactHooks } from '@web3-react/core'

import {
  network,
  metaMask,
  walletConnect,
  networkHooks,
  metaMaskHooks,
  walletConnectHooks
} from './connectors'

import type { MetaMask } from '@web3-react/metamask'
import type { Network } from '@web3-react/network'
import type { WalletConnect } from '@web3-react/walletconnect'

import './App.scss'

const MobileErrorOverlay = () => {
  return (
    <div className='flex flex-col items-center justify-between pb-12'>
      <div>
        <MobileErrorIcon className='mb-8 -mr-4' />
      </div>
      <div>
        <div className='text-center pt-4 pb-8 text-3xl leading-snug'>
          Sorry, Neon Faucet <br />
          doesn’t work
          <br /> at mobile phones.
        </div>
        <div className='text-center text-gray-300'>
          But you can still explore the possibilities of Neon ecosystem at neonevm.org
        </div>
      </div>
      <div className='mt-10'>
        <a rel='noopener noreferrer' target='_blank' href='https://neonevm.org/'>
          <Button>Visit Neon EVM</Button>
        </a>
      </div>
    </div>
  )
}

const connectors: [WalletConnect | MetaMask | Network, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
  [network, networkHooks]
]

export default function App() {
  if (isMobile())
    return (
      <Layout className='flex flex-col w-full relative'>
        <MobileErrorOverlay />
      </Layout>
    )

  return (
    // @ts-ignore
    <Web3ReactProvider connectors={[connectors]}>
      <Layout className='flex flex-col w-full relative'>
        <TokensProvider>
          {/* @ts-ignore */}
          <TokenGetter />
        </TokensProvider>
        <CookieBanner />
      </Layout>
    </Web3ReactProvider>
  )
}
