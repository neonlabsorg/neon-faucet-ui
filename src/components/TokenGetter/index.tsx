import { useRef, useState, useCallback, useContext } from 'react'
import Form from './form'
import Button from '../common/Button'
import { Notificator } from './notificator'
import { REQUEST_LIMIT_SEC } from '../../utils'
import { WalletContext } from '../../contexts/wallets'
import type { NotificatorData } from './types'

export default function TokenGetter() {
  const [response, setResponse] = useState<NotificatorData | null>(null)
  const [waiting, setWaiting] = useState(false)
  const responseTimeout = useRef<NodeJS.Timeout | null>(null)

  const { notification, setNotification, currentProvider, connectedWallet, injectedProviders, handleConnectWallet } = useContext(WalletContext)

  const updateResponse = useCallback((resp: NotificatorData | null) => {
    setResponse(resp)
    setWaiting(true)

    if (responseTimeout.current) {
      clearTimeout(responseTimeout.current);
    }

    responseTimeout.current = setTimeout(() => {
      setResponse(null)
      setWaiting(false)
    }, REQUEST_LIMIT_SEC * 1000)
  }, []);

  const renderByAccountState = useCallback(() => {
    if (connectedWallet)
      return (
        <Form
          waiting={waiting}
          response={response}
          blocked={response !== null}
          onResponse={updateResponse}
        />
      )
    else {
      return (
        <div className='flex flex-col px-6 items-start'>
          <div
            className='text-2xl font-bold max-w-xl mb-12'>{`Neon's Faucet service will help you get NEON test tokens or other ERC-20 test tokens to be used for testing applications on devnet.`}</div>
          <div className='flex flex-wrap items-center'>
            {injectedProviders.size
              ? (
                <div className='flex flex-col mr-16 mb-4 sm:mb-0'>
                  <div className='text-xl font-bold'>{`Let's get started:`}</div>
                  <div>{`Connect your wallet`}</div>
                </div>
              )
              :(
                <div className='text-xl font-bold'>Please install a wallet that supports NEON network</div>
              )
            }
            <div className='grid grid-cols-2 gap-4'>
              {!!injectedProviders.size && Object.values(Object.fromEntries(injectedProviders.entries())).map(wallet => (
                <Button key={wallet.info.rdns} layoutTheme='dark' onClick={() => { handleConnectWallet(wallet)}}>
                  {`Connect ${wallet.info.name}`}
                </Button>
              ))}
            </div>

          </div>
        </div>
      )
    }
  }, [connectedWallet, injectedProviders, handleConnectWallet])

  return (
    <>
      <div className={`w-full flex-grow flex flex-col justify-center margin-header`}>
        <div className='w-full max-w-1040px mx-auto'>{renderByAccountState()}</div>
      </div>
      {!!notification || response?.details ? (
        <div className='absolute bottom-0 left-0 right-0'>
          <Notificator
            provider={currentProvider}
            response={notification || response}
            onClose={() => {
              if (notification) setNotification(null);
              if (response) setResponse(null);
            }}
          />
        </div>
      ) : null}
    </>
  )
}
