import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { useRef, useState } from 'react'
import Form from './form'
import { injected } from '../../connectors'
import Button from '../common/Button'
import { ReactComponent as Warning } from '@/assets/warning.svg'
import { Notificator } from './notificator'
import { REQUEST_LIMIT_SEC } from '../../config'
import web3 from 'web3'

export default function TokenGetter() {
  const { activate, error, active } = useWeb3React()
  const [response, setResponse] = useState(null)
  const [waiting, setWaiting] = useState(false)
  const responseTimeout = useRef(null)

  const updateResponse = (resp) => {
    setResponse(resp)
    setWaiting(true)
    responseTimeout.current = setTimeout(() => {
      setResponse(null)
      setWaiting(false)
    }, REQUEST_LIMIT_SEC * 1000)
  }

  async function connect() {
    try {
      await activate(injected)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function switchNetwork() {
    const chainId = web3.utils.toHex(245022926)
    const chainName = 'Neon (Devnet)'
    const rpcUrls = ['https://devnet.neonevm.org']
    try {
      await window['ethereum'].request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }]
      })
    } catch (e) {
      if (e.code === 4902) {
        await window['ethereum'].request({
          method: 'wallet_addEthereumChain',
          params: [{
            rpcUrls,
            chainName,
            chainId,
            nativeCurrency: { name: 'Neon', symbol: 'NEON', decimals: 18 }
          }]
        })
      } else {
        console.log(e)
      }
    }
  }

  const renderByAccountState = () => {
    if (active)
      return (
        <Form
          waiting={waiting}
          response={response}
          blocked={response !== null}
          onResponse={updateResponse}
        />
      )
    else if (error) {
      if (error instanceof UnsupportedChainIdError) {
        return (
          <div className='flex flex-col px-6'>
            <div className='flex items-center'>
              <div className='w-12 h-12 flex items-center justify-center mr-4'>
                <Warning />
              </div>
              <div className='flex flex-col'>
                <div className='text-xl font-bold mb-1'>
                  Your wallet not connected to NEON Devnet
                </div>
                <div>
                  Please select the appropriate Ethereum network and try connecting the wallet again
                </div>
              </div>
            </div>
            <div className='pl-16 pt-6 flex flex-wrap'>
              <Button className='mr-4' layoutTheme='dark' onClick={switchNetwork}>
                Switch To Neon
              </Button>
              <Button transparent layoutTheme='dark' onClick={() => window.location.reload()}>
                Reload page
              </Button>
            </div>
          </div>
        )
      } else {
        return (
          <div className='flex items-center'>
            <div className='w-12 h-12 flex items-center justify-center mr-6'>
              <Warning />
            </div>
            <div className='mr-6 text-xl font-bold'>
              Check is your metamask wallet
              <br /> installed on Chrome as extension.
            </div>
            <Button transparent layoutTheme='dark' onClick={() => window.location.reload()}>
              Reload page
            </Button>
          </div>
        )
      }
    } else {
      return (
        <div className='flex flex-col px-6 items-start'>
          <div
            className='text-2xl font-bold max-w-xl mb-12'>{`Neon's Faucet service will help you get NEON test tokens or other ERC-20 test tokens to be used for testing applications on devnet.`}</div>
          <div className='flex flex-wrap items-center'>
            <div className='flex flex-col mr-16 mb-4 sm:mb-0'>
              <div className='text-xl font-bold'>{`Let's get started:`}</div>
              <div>{`Connect your wallet`}</div>
            </div>
            <Button layoutTheme='dark' onClick={connect}>
              Connect Wallet
            </Button>
          </div>
        </div>
      )
    }
  }
  return (
    <>
      <div className={`w-full flex-grow flex flex-col justify-center margin-header`}>
        <div className='w-full max-w-1040px mx-auto'>{renderByAccountState()}</div>
      </div>
      {response?.details ? (
        <div className='absolute bottom-0 left-0 right-0'>
          <Notificator
            response={response}
            onClose={() => setResponse((prevState) => ({ success: prevState.success }))}
          />
        </div>
      ) : null}
    </>
  )
}
