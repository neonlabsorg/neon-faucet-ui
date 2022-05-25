import { useState, useEffect } from 'react'
import { shortenAddress } from '../../utils'
import {ReactComponent as Dropdown} from '../../assets/dropdown.svg'
export const TechnicalInfo = () => {
  const [visible, setVisible] = useState(false)
  const [tokenlist, setTokenlist] = useState([])
  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/neonlabsorg/token-list/main/tokenlist.json`)
    .then((resp) => {
      if (resp.ok) {
        resp.json().then(data => {
          const tokens = data.tokens.filter((token) => token.chainId === 245022926)
          setTokenlist(tokens)
        })
      }
    })
  }, [])
  return <div className='flex w-full max-w-md mx-auto flex-col mt-20'>
    <div className='flex w-full items-center justify-between py-6 cursor-pointer' onClick={() => setVisible(!visible)}>
      <h3 className='text-lg'>Approved token addresses for devnet</h3>
      <Dropdown className={visible ? 'transform rotate-180' : ''}/>
    </div>
    <div className={`w-full flex flex-col h-60 overflow-auto ${visible ? '' : 'hidden'}`}>
      {tokenlist.map(item => {
        return <div className='py-3 flex justify-between pr-3'>
          <span>{item.name}</span>
          <span>{shortenAddress(item.address)}</span>
        </div>
      })}
    </div>
  </div>
}