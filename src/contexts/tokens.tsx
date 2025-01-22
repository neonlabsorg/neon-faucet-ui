import { BrowserProvider, Contract } from 'ethers'
import { Big } from 'big.js';
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import ERC20_ABI from '../hooks/abi/erc20.json'
import { NEON_TOKEN_MINT, NEON_TOKEN_MINT_DECIMALS } from 'neon-portal/src/constants'
import { CHAIN_IDS } from '../connectors'
import { useHttp } from '../utils/useHttp'
import { FAUCET_URL } from '../config'

import { WalletContext } from './wallets'

export const TokensContext = createContext({
  list: [],
  tokenErrors: {},
  pending: false,
  tokenManagerOpened: false
})

const NEON_TOKEN_MODEL = {
  chainId: 0,
  address_spl: NEON_TOKEN_MINT,
  address: '',
  decimals: NEON_TOKEN_MINT_DECIMALS,
  name: 'Neon',
  symbol: 'NEON',
  logoURI: 'https://raw.githubusercontent.com/neonlabsorg/token-list/main/neon_token_md.png'
}

export function TokensProvider({ children = undefined }) {
  const { get } = useHttp()

  const { connectedWallet, currentProvider } = useContext(WalletContext)
  const [neonChain, setNeonChain] = useState<number>(0)

  useEffect(() => {
    const getChainId = async () => {
      if (currentProvider) {
        try {
          const providerNetworkId = await currentProvider.request({ method: 'eth_chainId' });
          if (Number(providerNetworkId) === CHAIN_IDS.devnet) setNeonChain(Number(providerNetworkId));
        } catch (error) {
          console.error('Error fetching chain ID:', error)
          setNeonChain(0)
        }
      }
    };

    getChainId()
  }, [currentProvider])

  const initialTokenListState = useMemo(() => {
    if(neonChain) { //Due to the issue with invisible native tokens in other chains
      return Object.keys(CHAIN_IDS).map((key) => {
        const chainId = CHAIN_IDS[key]
        const model = Object.assign({}, NEON_TOKEN_MODEL)
        model.chainId = chainId
        return model
      })
    }
    return []
  }, [neonChain])
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
    if (currentProvider) {
      if (currentProvider && Number.isNaN(neonChain)) {
        return CHAIN_IDS['devnet']
      }
      return Number(neonChain)
    }
  }, [currentProvider, neonChain])

  const getEthBalance = async (token): Promise<number> => {
    if (token.address_spl === NEON_TOKEN_MINT) {
      try {
        const balanceHex = await currentProvider.request({
          method: "eth_getBalance",
          params: [connectedWallet, "latest"],
        }) as string

        const balanceWei = BigInt(balanceHex);
        const balance = Number(balanceWei) / Math.pow(10, token.decimals);

        return +balance.toFixed(4);
      } catch(e) {
        console.log(e)
      }
    }

    const ethersProvider = new BrowserProvider(currentProvider)
    const signer = await ethersProvider.getSigner()
    const tokenContract = new Contract(token.address, ERC20_ABI, signer);
    const balance = await tokenContract.balanceOf(signer.address)

    return Number(new Big(balance).div(Math.pow(10, token.decimals)))
  }

  const requestListBalances = async (list) => {
    for (const item of list) {
      let balance
      try {
        if (currentProvider) {
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
    const fullList = [...initialTokenListState].concat(source.filter((item) => availableTokens.includes(item.address)))
    const newList = neonChain ? fullList.filter((item) => item.chainId === filteringChainId) : fullList.map((item) => { return { ...item, chainId: neonChain }})
    setTokenList(newList)
    await requestListBalances(newList)
  }

  const updateTokenList = (availableTokens = []) => {
    setPending(true)

    import('token-list/tokenlist.json')
      .then((module) => {
        mergeTokenList(module.tokens, availableTokens);
      })
      .catch((err) => {
        setError(`Failed to fetch neon transfer token list: ${err.message}`);
      })
      .finally(() => setPending(false));
  }

  useEffect(() => {
    if (connectedWallet) {
      get(`${FAUCET_URL}/request_erc20_list`).then(({ data }) => {
        updateTokenList(data)
      })
      // @ts-ignore
    } else {
      setTokenErrors({})
      setTokenList([])
      setBalances({})
    }
    // eslint-disable-next-line
  }, [connectedWallet])

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
