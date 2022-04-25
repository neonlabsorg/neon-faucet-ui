import { useRef, useState } from 'react';
import Button from '../common/Button';
import { Input as NumericalInput } from '../common/NumericalInput'
import { Loader } from '../common/Loader'
import { useWeb3React } from '@web3-react/core';
import { TokenSelect } from './TokenSelect';
import { useHttp } from '../../utils/useHttp';



export default function Form({className = ''}) {
  const {post} = useHttp()
  const responseTimeout = useRef(null)
  const [amount, setAmount] = useState(0)
  const [token, setToken] = useState({})
  const [isMaxAmountIncreaced, setIsMaxAmointIncreased] = useState(false)
  const {account} = useWeb3React()
  const [response, setResponse] = useState({
    success: true,
    message: ''
  })

  const updateResponse = (resp) => {
    setResponse(resp)
    responseTimeout.current = setTimeout(() => {
      setResponse({success: true, message: ''})
    }, 60000)
  }

  const [airdropPending, setAirdropPending] = useState(false)

  const postAirdrop = () => {
    const hostname = process.env.REACT_APP_FAUCET_URL ? process.env.REACT_APP_FAUCET_URL : window.location.hostname
    const url = token.symbol === 'NEON' ? `${hostname}/request_neon`
      : `${hostname}/request_erc20`
    const data = token.symbol === 'NEON' ? {
      amount, wallet: account
    } : {
      amount, wallet: account, token_addr: token.address
    }
    setAirdropPending(true)
    post(url, data).then(resp => {
      updateResponse({
        success: true,
        message: 'Transferred successfully'
      })
    }).catch(err => {
      const message = err.response === undefined ? 
        `Request seems to be blocked by CORS policy. Response isn't avaliable` : err.response.data || 'unknown error'
      updateResponse({
        success: false,
        message
      })
    }).finally(() => setAirdropPending(false))
  }

  const updateAmount = (value) => {
    setAmount(value)
    if (value < 0) return
    if (value > 100) setIsMaxAmointIncreased(true)
    else setIsMaxAmointIncreased(false)
  }

  return <div className={`${className} tg-form`}>
  <div className='tg-form__amount'>
    
    <TokenSelect className='w-full mb-6' tokenName={token.name} onChoose={setToken}/>
    <NumericalInput
      className="tg-form__input"
      value={amount}
      error={isMaxAmountIncreaced ? 'true' : 'false'}
      onUserInput={val => {
        updateAmount(+val)
      }}
    />
  </div>
  <div className='tg-form__footer'>
    <div className='tg-form__btn-wrapper flex items-center'>
      <Button className='tg-form__btn' disabled={isMaxAmountIncreaced || amount === 0 || (response && response.message) || airdropPending === true || !token.address}
        onClick={() => postAirdrop()}>{'test airdrop'}</Button>
    </div>
    { airdropPending ? <Loader className='ml-4' /> : null }
  </div>
    {response.message && response.message.length ? 
    <div className='tg-form__response'>
      <div className={`tg-form__res-text ${!response.success ? 'tg-form__res-text--error' : ''}`}>{response.message}</div>
      <div className='tg-form__res-lock'>{"Next request will be unlock after one minute expiration for a security reasons"}</div>
    </div>
    : null}
  </div>
}