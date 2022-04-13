import { useTokensContext } from "@/contexts/tokens";
import { useEffect, useRef, useState, useMemo } from "react"
import { Loader } from "../common/Loader";
import stub from '@/assets/no_symbol.svg'

export const TokenSymbol = ({src = '', alt = ''}) => {
  const imgRef = useRef(null)

  const [failed, setFailed] = useState(false)

  const currentSource = useMemo(() => {
    if (failed === true) return stub
    else return src
    // eslint-disable-next-line
  }, [failed])

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
    return () => current.onerror = null
  }, [])

  return <>
    <img ref={imgRef} src={currentSource} alt={alt} />
  </>
}


const TokenRow = ({
  token = {
    logoURI: '',
    symbol: '',
    address: '',
    name: ''
  },
  onClick = () => {}
}) => {
  const { balances } = useTokensContext()

  return <div className={`
      flex px-6 py-2 justify-between dark:text-white hover:bg-gray-600 cursor-pointer
    `}
    onClick={onClick}>
    <div className='flex items-center w-1/2 pr-4'>
      <div className='w-1/3 pr-4'>
        <TokenSymbol src={token.logoURI} alt={token.name} />
      </div>
      <div className='w-2/3 flex flex-col'>
        <div className='text-lg mb-2'>{token.symbol}</div>
        <div className='text-sm text-gray-500'>{token.name}</div>
      </div>
    </div>
    <div className='w-1/2 pl-4 text-sm flex items-center justify-end'>
      <div className='flex flex-col items-end'>
        {balances ? JSON.stringify(balances[token.symbol]): null}
      </div>
    </div>
  </div>
}


export const TokenSelect = ({className = '', tokenName = '', onChoose = () => {}}) => {
  const {list, pending, error} = useTokensContext()
  const [opened, setOpened] = useState()
  const [searchString, setSearchString] = useState('')
  const findBySearch = () => {
    const arr = []
    if (!searchString.length) return arr
    const fs = searchString.toLowerCase()
    list.forEach(item => {
      if (
        item.name.toLowerCase().includes(fs) ||
        item.symbol.toLowerCase().includes(fs) ||
        item.address.toLowerCase() === fs ||
        item.address_spl.toLowerCase() === fs
        ) {
        arr.push(item)
      }
    })
    return arr
  }
  const searchList = useMemo(findBySearch, [list, searchString]);
  return <div className={`flex flex-col relative bg-dark-600 ${className}`}>
    <div className={`flex p-4 cursor-pointer border-b ${opened ? 'border-purple-800' : 'border-transparent'}`}
      onClick={() => setOpened(!opened)}>
      {tokenName ? tokenName : 'Choose Token'}
    </div>
    {opened === true ?
      <div>
        
        <input
          className='w-full bg-dark-600 py-6 px-4 border-b border-l border-r border-purple-800'
          placeholder={'Choose or paste token'}
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}/>
        <div className={"overflow-y-auto absolute bg-dark-600 top-full z-20"}
          style={{
            maxHeight: '50vh'
          }}>
        {list && !error && list.length && !pending && !searchString ?
          list.map((token) => {
            return <TokenRow token={token} key={token.name} onClick={() => {
              onChoose(token)
              setOpened(false)
            }}/>
          }) :
            searchString ?
              searchList.map((token) => {
                return <TokenRow token={token} key={token.symbol} onClick={() => {
                  onChoose(token)
                  setOpened(false)
                }}/>
              }) :
              pending ?
                <div className='p-4 flex items-center'>
                  <Loader/>
                  <span className='ml-4 text-lg'>Updating token list, please wait...</span>
                </div> :
                error ?
                  <div className='flex p-4 flex-col'>
                    <div className='text-lg mb-4'>Error getting token list</div>
                    <div className='text-gray-600'>{error}</div>
                  </div>
              : list.length ? <>No tokens has been provided</> : null }
        </div>
      </div>
    : null }
  </div>
}