import { useMemo, useState } from 'react'
import SuccessIcon from '@/assets/success.svg'
import ErrorIcon from '@/assets/error.svg'
import CrossIcon from '@/assets/cross.svg'
import { addTokenToWallet } from "../../utils"
import type { EIP1193Provider } from "../../types"
import { NotificatorData } from "./types"

export const Notificator = (
  data: { provider: EIP1193Provider | null, response: NotificatorData, onClose: () => void }
) => {
  const {
    provider,
    response = { success: true, details: null, token: null },
    onClose = () => {},
  } = data
  const [disabled, setDisabled] = useState(false)
  const [added, setAdded] = useState(false)

  const tokenName = useMemo(() => {
    const { token } = response
    return token ? `Add ${token.symbol} to the wallet` : ''
  }, [response.token])

  const showButton = useMemo(() => {
    const { token } = response
    return provider && token && token.symbol !== 'NEON' && !added
  }, [response.token, added, provider])

  async function addToken() {
    const { token } = response
    try {
      setDisabled(true)
      await addTokenToWallet(token, provider)
      setDisabled(false)
      setAdded(true)
    } catch (e) {
      console.error('Error adding token:', e);
    } finally {
      setDisabled(false);
    }
  }

  const NotificationContent = () => (
    <div className="flex items-center">
      <div className="w-8 h-8 mr-4">
        {response.success ? <SuccessIcon /> : <ErrorIcon />}
      </div>
      <div className="flex flex-col">
        <h2 className="font-bold">{response.details}</h2>
        <p className="text-sm">
          {'For security reasons, please wait a minute before making a new request'}
        </p>
      </div>
    </div>
  );

  return (
    <div
      className={`p-3 w-full relative ${
        response.success ? 'bg-green text-black' : 'bg-error-red text-white'
      }`}
    >
      <div
        className="absolute top-0 bottom-0 w-6 h-6 right-6 flex items-center justify-center m-auto cursor-pointer"
        onClick={onClose}
      >
        <CrossIcon
          className={`${response.success ? 'fill-black' : 'fill-white'}`}
        />
      </div>
      <div className="max-w-1040px mx-auto">
        <div className="pr-8 flex items-center">
          <NotificationContent />
          {response.success && showButton && (
            <div className="ml-4">
              <button
                className="inline-block py-2 px-5 bg-black rounded-full text-white"
                onClick={addToken}
                disabled={disabled}
              >
                {tokenName}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
