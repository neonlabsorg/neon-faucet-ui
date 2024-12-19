import { useWeb3React } from '@web3-react/core'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
// import { useNetworkType } from '../hooks'
// import ERC20_ABI from '../hooks/abi/erc20.json'
import { CHAIN_IDS } from '../connectors'
import { usePrevious } from '../utils'
import { useHttp } from '../utils/useHttp'
import { FAUCET_URL } from '../config'

export const TokensContext = createContext({
  list: [],
  tokenErrors: {},
  pending: false,
  tokenManagerOpened: false,
  setTokenManagerOpened: () => {},
  updateTokenList: () => {}
})

const NEON_TOKEN_MODEL = {
  chainId: 0,
  address_spl: '89dre8rZjLNft7HoupGiyxu3MNftR577ZYu8bHe2kK7g',
  address: '',
  decimals: 18,
  name: 'Neon',
  symbol: 'NEON',
  logoURI: 'https://raw.githubusercontent.com/neonlabsorg/token-list/main/neon_token_md.png'
}

export function TokensProvider({ children = undefined }) {
  const { get } = useHttp()
  const { provider, account, chainId } = useWeb3React()

  // const { chainId } = useNetworkType()
  const neonChain = useMemo(() => chainId === CHAIN_IDS.devnet, [chainId])
  const initialTokenListState = useMemo(() => {
    if (neonChain) {
      //Due to the issue with invisible native tokens in other chains
      return Object.keys(CHAIN_IDS).map((key) => {
        const chainId = CHAIN_IDS[key]
        const model = Object.assign({}, NEON_TOKEN_MODEL)
        model.chainId = chainId
        return model
      })
    }
    return []
  }, [neonChain])
  const prevAccountState = usePrevious()
  const [list, setTokenList] = useState(initialTokenListState)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [tokenErrors, setTokenErrors] = useState({})
  const [balances, setBalances] = useState({})
  const addBalance = (symbol, balance) => {
    balances[symbol] = balance
    setBalances({ ...balances })
  }

  const filteringChainId = useMemo(() => {
    if (Number.isNaN(chainId)) return CHAIN_IDS['devnet']
    return chainId
  }, [chainId])

  const getEthBalance = async (token) => {
    if (token.address_spl === '89dre8rZjLNft7HoupGiyxu3MNftR577ZYu8bHe2kK7g') {
      const balance = await provider.getBalance(account)
      return +(Number(balance) / Math.pow(10, token.decimals)).toFixed(4)
    }
    // const tokenInstance = new library.eth.Contract(ERC20_ABI, token.address)
    // const balance = await tokenInstance.methods.balanceOf(account).call()
    // return balance / Math.pow(10, token.decimals)
  }

  const requestListBalances = async (list) => {
    for (const item of list) {
      let balance
      try {
        // console.log(account)
        if (account) {
          balance = await getEthBalance(item)
        } else {
          balance = undefined
        }
        setTimeout(() => addBalance(item.symbol, balance))
      } catch (e) {
        console.warn(e)
      }
    }
  }

  const mergeTokenList = async (source = [], availableTokens = []) => {
    const fullList = [...initialTokenListState].concat(
      source.filter((item) => availableTokens.includes(item.address))
    )
    const newList = neonChain
      ? fullList.filter((item) => item.chainId === filteringChainId)
      : fullList.map((item) => {
          return { ...item, chainId: chainId }
        })
    setTokenList(newList)
    await requestListBalances(newList)
  }

  const updateTokenList = (availableTokens = []) => {
    setPending(true)
    import('token-list/tokenlist.json')
      .then(({ tokens }) => {
        mergeTokenList(tokens, availableTokens)
      })
      .catch((err) => {
        setError(`Failed to fetch neon transfer token list: ${err.message}`)
      })
      .finally(() => setPending(false))
  }

  useEffect(() => {
    if (!prevAccountState && account && account.length) {
      get(`${FAUCET_URL}/request_erc20_list`).then(({ data }) => {
        updateTokenList(data)
      })
      // @ts-ignore
    } else if (!account && prevAccountState && prevAccountState.length) {
      setTokenErrors({})
      setTokenList([])
      setBalances({})
    }
    // eslint-disable-next-line
  }, [account])

  return (
    <TokensContext.Provider
      // @ts-ignore
      value={{ list, pending, error, tokenErrors, balances, updateTokenList }}
    >
      {children}
    </TokensContext.Provider>
  )
}

export function useTokensContext(): any {
  return useContext(TokensContext)
}
