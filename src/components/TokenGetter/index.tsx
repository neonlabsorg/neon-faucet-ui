import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import Form from './form'
import Web3Status from '../common/Web3Status';

export default function TokenGetter() {
  const { account, error } = useWeb3React()
  const renderByAccountState = () => {
    if (error) {
      return <div className='token-getter__error-wrapper'>
        <>{error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error connecting'}</>
      <div className='wallet-modal__wrapper'>
        {error instanceof UnsupportedChainIdError ? (
          <h5>Please connect to the appropriate Ethereum network.</h5>
        ) : (
          'Error connecting. Try refreshing the page.'
        )}
      </div>
      </div>
    } else if (account) return <Form/>
    else {
      return <div className='token-getter__unlogged'>
        <div className='token-getter__summary'>{'Connect your wallet to get tokens'}</div>
        <Web3Status/>
      </div>
    }
  }
  return (
    <div className={`token-getter `}>
      <div className='token-getter__plate'>
        {renderByAccountState()}
      </div>
    </div>
  )
}

