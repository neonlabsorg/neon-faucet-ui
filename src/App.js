import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
import './App.scss';
import Layout from './components/common/Layout'
import TokenGetter from './components/TokenGetter';
import { TokensProvider } from './contexts/tokens';

function getLibrary(provider) {
  return new Web3(provider)
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Layout className='flex flex-col w-full relative'>
        <TokensProvider>
          <TokenGetter/>
        </TokensProvider>
      </Layout>
    </Web3ReactProvider>
  )
}

export default App;
