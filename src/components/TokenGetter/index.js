import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { useState, useRef } from 'react';
import Form from './form'
import { injected } from '../../connectors';
import Button from '../common/Button';
import { ReactComponent as Warning } from '@/assets/warning.svg'
import { Notificator } from './notificator';

export default function TokenGetter() {
  const { activate, error, active } = useWeb3React()
  const [response, setResponse] = useState({
    success: true,
    details: 'Transferred successfully'
  })
  const responseTimeout = useRef(null)
  const updateResponse = (resp) => {
    setResponse(resp)
    responseTimeout.current = setTimeout(() => {
      setResponse({})
    }, 60000)
  }
  const connect = async () => {
    try {
      await activate(injected)
    } catch (ex) {
      console.log(ex)
    }
  }
  const renderByAccountState = () => {
    if (active) return <Form blocked={response.details && response.details.length > 0} onResponse={updateResponse}/>
    else if (error) {
      if (error instanceof UnsupportedChainIdError) {
        return <div className='flex flex-col'>
          <div className='flex items-center'>
            <div className='w-12 h-12 flex items-center justify-center mr-4'>
              <Warning/>
            </div>
            <div className='flex flex-col'>
              <div className='text-xl font-bold mb-1'>Your wallet not connected to NEON Devnet or Testnet</div>
              <div>Please select the appropriate Ethereum network and try connecting the wallet again</div>
            </div>
          </div>
          <div className='pl-16 pt-6'>
            <Button className='mr-4' layoutTheme='dark' onClick={connect}>Connect Wallet</Button>
            <Button transparent layoutTheme='dark' onClick={() => window.location.reload()}>Reload page</Button>
          </div>
        </div>
      } else {
        return <div className='flex items-center'>
          <div className='w-12 h-12 flex items-center justify-center mr-6'>
            <Warning/>
          </div>
          <div className='mr-6 text-xl font-bold'>Check is your metamask wallet<br/> installed on Chrome as extension.</div>
          <Button transparent layoutTheme='dark' onClick={() => window.location.reload()}>Reload page</Button>
        </div>
      }
    } else {
      return <div className='flex flex-col items-start'>
        <div className='text-2xl font-bold max-w-xl mb-12'>{`Faucet is Neon's official service that helps you get test NEON or other ERC-20 tokens on devnet for testing applications.`}</div>
        <div className='flex items-center'>
          <div className='flex flex-col mr-16'>
            <div className='text-xl font-bold'>{`Let's start:`}</div>
            <div>{`Connect your wallet`}</div>
          </div>
          <Button layoutTheme='dark' onClick={connect}>Connect Wallet</Button>
        </div>
      </div>
    }
  }
  return (
    <>
      <div className={`w-full flex-grow flex flex-col justify-center`}>
        <div className='w-full max-w-1040px mx-auto'>
          {renderByAccountState()}
        </div>
      </div>
      {response && response.details ? <div className='absolute bottom-0 left-0 right-0'>
        <Notificator response={response} onClose={() => setResponse({})}/>
      </div> : null}
    </>
  )
}

