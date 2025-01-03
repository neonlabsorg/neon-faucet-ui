import { useMemo, useState } from 'react'
import SuccessIcon from '@/assets/success.svg'
import ErrorIcon from '@/assets/error.svg'
import CrossIcon from '@/assets/cross.svg'

export const Notificator = (data) => {
  const {
    response = { success: true, details: null, token: null },
    onClose = () => {
    }
  } = data
  const [disabled, setDisabled] = useState(false)
  const [added, setAdded] = useState(false)

  const tokenName = useMemo(() => {
    const token = data.response.token
    return `Add ${token.symbol} to MetaMask`
  }, [data.response.token])

  const showButton = useMemo(() => {
    const token = data.response.token
    return token && token.symbol !== 'NEON' && !added
  }, [data.response.token, added])

  async function addToken() {
    const { address, symbol, decimals, logoURI: image } = data.response.token
    try {
      setDisabled(true)
      await window['ethereum'].request({
        method: 'wallet_watchAsset',
        params: { type: 'ERC20', options: { address, symbol, decimals, image } }
      })
      setDisabled(false)
      setAdded(true)
    } catch (e) {
    }
  }

  return <div
    className={`p-3 w-full relative ${response.success === true ? 'bg-green text-black' : 'bg-error-red text-white'}`}>
    <div
      className='absolute top-0 bottom-0 w-6 h-6 right-6 flex items-center justify-center m-auto cursor-pointer'
      onClick={onClose}>
      <CrossIcon className={`${response.success === false ? 'fill-white' : 'fill-black'}`} />
    </div>
    <div className='max-w-1040px mx-auto'>
      {response.success === true ?
        <div className='pr-8 flex items-center'>
          <div className='w-8 h-8 mr-4'>
            <SuccessIcon />
          </div>
          <div className='flex flex-row items-center'>
            <div className='flex flex-col'>
              <h2 className='font-bold'>{response.details}</h2>
              <p className='text-sm'>
                {'For security reasons, please wait a minute before making a new request'}
              </p>
            </div>
          </div>
          {showButton ? <div className='ml-4'>
            <button className='inline-block py-2 px-5 bg-black rounded-full text-white'
                    onClick={addToken} disabled={disabled}>{tokenName}</button>
          </div> : null}
        </div> :
        <div className='flex items-center'>
          <div className='w-8 h-8 mr-4'>
            <ErrorIcon />
          </div>
          <div className='flex flex-row items-center'>
            <div className='flex flex-col'>
              <h2 className='font-bold'>{response.details}</h2>
              <p className='text-sm'>
                {'For security reasons, please wait a minute before making a new request'}
              </p>
            </div>
          </div>
        </div>}
    </div>
  </div>
}
