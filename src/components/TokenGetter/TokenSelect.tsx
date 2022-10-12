import { useTokensContext } from '../../contexts/tokens'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Loader } from '../common/Loader'
import stub from '../../assets/no_symbol.svg'
import { ReactComponent as DdIcon } from '../../assets/dropdown.svg'

export const TokenSymbol = ({ src = '', alt = '' }) => {
  const imgRef = useRef(null)

  const [failed, setFailed] = useState(false)

  const currentSource = useMemo(() => {
    if (failed === true) return stub
    else return src
    // eslint-disable-next-line
  }, [failed, src])

  const handleError = () => {
    setFailed(true)
  }

  useEffect(() => {
    setFailed(false)
  }, [src])

  useEffect(() => {
    if (!imgRef.current) return
    const { current } = imgRef
    current.onerror = handleError
    return () => (current.onerror = null)
  }, [])

  return (
    <>
      <img ref={imgRef} src={currentSource} alt={alt} />
    </>
  )
}

const TokenRow = (data: any) => {
  const {
    token = { logoURI: '', symbol: '', address: '', name: '' },
    onClick = () => {
    },
    active
  } = data
  const { balances } = useTokensContext()

  return (
    <div className={`flex px-4 py-2 justify-between dark:text-white hover:bg-dark-hover-inputs cursor-pointer`}
         onClick={onClick}>
      <div className='flex items-center flex-grow pr-4'>
        <div className='w-6 h-6 mr-4'>
          <TokenSymbol src={token.logoURI} alt={token.name} />
        </div>

        <div className='flex-grow flex flex-col'>
          <div className={active ? 'text-green' : 'text-base'}>{token.symbol}</div>
          <div className='text-sm text-gray-500'>{token.name}</div>
        </div>
      </div>
      <div className='flex-grow pl-4 text-sm flex items-center justify-end'>
        <div className='flex flex-col items-end'>
          {balances ? JSON.stringify(balances[token.symbol]) : null}
        </div>
      </div>
    </div>
  )
}

export const TokenSelect = (props: any) => {
  const {
    className = '', tokenName = '', onChoose = () => {
    }
  } = props
  const { list, pending, error } = useTokensContext()
  const [opened, setOpened] = useState<any>()
  const activeToken = useMemo(() => {
    return list.find((item) => item.name === tokenName)
  }, [list, tokenName])
  return (
    <div className={`flex flex-col relative ${className}`}>
      <div
        className={`px-4 py-3 cursor-pointer bg-dark-600 hover:bg-dark-hover-inputs rounded-lg 
      flex items-center justify-between ${opened ? 'bg-dark-hover-inputs' : null} ${tokenName ? 'bg-dark-hover-inputs' : null}`}
        onClick={() => setOpened(!opened)}>
        <span className='h-6'>
          {tokenName ? (
            <span className='inline-flex items-center'>
              <div className='w-6 h-6 mr-4'>
                <TokenSymbol src={activeToken.logoURI} alt={activeToken.name} />
              </div>
              <span>{activeToken.name}</span>
            </span>
          ) : (
            'Choose Token'
          )}
        </span>
        <DdIcon className={`fill-white ${opened ? 'transform rotate-180' : ''}`} />
      </div>
      {opened === true ? (
        <div className='absolute w-full top-full z-10 mt-2'>
          <div
            className={'overflow-y-auto absolute w-full bg-dark-600 rounded-b-lg top-full rounded-t-lg z-20'}
            style={{ maxHeight: '240px' }}
          >
            {list && !error && list.length && !pending ? (
              list.map((token) =>
                <TokenRow active={token.name === tokenName} token={token} key={token.name} onClick={() => {
                  onChoose(token)
                  setOpened(false)
                }} />)
            ) : pending ? (
              <div className='p-4 flex items-center'>
                <Loader />
                <span className='ml-4 text-lg'>Updating token list, please wait...</span>
              </div>
            ) : error ? (
              <div className='flex p-4 flex-col'>
                <div className='text-lg mb-4'>Error getting token list</div>
                <div className='text-gray-600'>{error}</div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}
