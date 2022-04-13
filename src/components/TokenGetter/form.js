import { useRef, useState } from 'react';
import Button from '../common/Button';
import { Input as NumericalInput } from '../common/NumericalInput'
import { Loader } from '../common/Loader'
import { useWeb3React } from '@web3-react/core';
import axios from 'axios'
import { TokenSelect } from './TokenSelect';



export default function Form({className = ''}) {
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
    }, 10000)
  }

  const [airdropPending, setAirdropPending] = useState(false)

  const postAirdrop = () => {
    const {hostname} = window.location
    const url = `${hostname}/request_airdrop`
    setAirdropPending(true)
    axios( {
      url,
      method: 'POST',
      headers: {
        'content-type': 'text/plain',
      },
      data: {
        amount, wallet: account, token: token.address
      }
    }).then(resp => {
      const text = resp.statusText
      console.dir(resp)
      updateResponse({
        success: true,
        message: text
      })
    }).catch(err => {
      const message = err.response === undefined ? 
        `Request seems to be blocked by CORS policy. Response isn't avaliable` : err.message
      updateResponse({
        success: false,
        message
      })
    }).finally(() => setAirdropPending(false))
  }

  const updateAmount = (value) => {
    setAmount(value)
    if (value < 0) return
    if (value > 1000) setIsMaxAmointIncreased(true)
    else setIsMaxAmointIncreased(false)
  }

  return <div className={`${className} tg-form`}>
  <div className='tg-form__amount'>
    <div className='tg-form__label-wrapper'>
    {airdropPending ? <Loader /> : null}
    </div>
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
    <div className='tg-form__btn-wrapper'>
      <Button className='tg-form__btn' disabled={isMaxAmountIncreaced || amount === 0 || (response && response.message) || airdropPending === true}
        onClick={() => postAirdrop()}>{'test airdrop'}</Button>
    </div>
  </div>
    {response.message && response.message.length ? 
    <div className='tg-form__response'>
      <div className={`tg-form__res-text ${!response.success ? 'tg-form__res-text--error' : ''}`}>{response.message}</div>
      <div className='tg-form__res-lock'>{"Next request will be unlock after one minute expiration for a security reasons"}</div>
    </div>
    : null}
  </div>
}