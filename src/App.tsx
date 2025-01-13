import { isMobile } from './config'
import Layout from './components/common/Layout'
import Button from './components/common/Button'
import MobileErrorIcon from '@/assets/mobile-error.svg'
import TokenGetter from './components/TokenGetter'
import CookieBanner from './components/CookieBanner';
import { TokensProvider } from './contexts/tokens'
import { WalletProvider } from './contexts/wallets'
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

function App() {
  if (isMobile())
    return (
      <Layout className='flex flex-col w-full relative'>
        <MobileErrorOverlay />
      </Layout>
    )

  return (
    <WalletProvider>
       <Layout className='flex flex-col w-full relative'>
        <TokensProvider>
          <TokenGetter />
        </TokensProvider>
        <CookieBanner />
      </Layout>
    </WalletProvider>
  )
}

export default App
