import { defineStore } from 'pinia'
import { TokensApi } from '@/api/tokens.ts'
import { useConnectionStore } from '@/stores/connection.ts'
import { NEON_TOKEN_MODEL, neonDevnet } from '@/models'
import { cropLongStrings } from '@/utils'

import type { Token } from '@/models'
import { ECards, ENotificationType, useCardsStore } from '@/stores/cards.ts'

interface ITokensState {
  _currentToken: Token | null
  _neonToken: Token
  _tokenAmount: number
  _tokenList: Token[]
  _supportedTokenList: string[]
}

const initialState = {
  _currentToken: null,
  _tokenAmount: 0,
  _supportedTokenList: [],
  _tokenList: [],
  _neonToken: NEON_TOKEN_MODEL
}

const mergeTokenList = (neonToken: Token, source: Token[], availableTokens: string[]) => [neonToken]
  .concat(source.filter((item) => availableTokens.includes(item.address)))
  .filter((item) => item.chainId === neonDevnet.id)


export const useTokensStore = defineStore('tokens',{
  state: (): ITokensState => initialState,
  actions: {
    async getTokenList() {
      try {
        const { data } = await TokensApi.getTokens()

        const tokenList =  mergeTokenList(this._neonToken,data || [], this._supportedTokenList)
        this.setTokenList(tokenList)
      } catch(e) {
        console.log(e)
      }
    },
    async getFaucetTokenList() {
      try {
        const data = await TokensApi.getFaucetTokens()

        this.setSupportedTokenList(data)
      } catch(e) {
        console.log(e)
      }
    },
    async sendAirdrop() {
      const connectionStore = useConnectionStore()
      const cardsStore = useCardsStore()

      try {
        //@ts-expect-error: can't be null at this point
        const { error } = await TokensApi.postTokenAirdrop(this._currentToken, {
          amount: this._tokenAmount,
          wallet: connectionStore.evmWalletAddress,
          ...(this._currentToken?.chainId === neonDevnet.id ? {
            token_addr: this._currentToken.address
          } : {})
        })

        if (!connectionStore.isWalletConnected) {
          return
        }

        if(error) {
          console.log(error)

          switch (error.code) {
            case 429:
              cardsStore.setNotification({
                type: ENotificationType.error,
                title: 'Too many requests',
                description: 'The next request will be unlocked after a one-minute expiration for security reasons'
              })
              break
            case 504:
              cardsStore.setNotification({
                type: ENotificationType.success,
                title: 'Transfer Completed',
                //@ts-expect-error: can't be undefined at this point
                subtitle: `There are now ${this._tokenAmount} ${this._currentToken?.name} in ${cropLongStrings(connectionStore._evm.address)} wallet.`,
                description: 'For security reasons, please wait a minute before making a new request'
              })
              break
            default:
              cardsStore.setNotification({
                type: ENotificationType.error,
                title: 'Something went wrong',
                description: 'Please select the appropriate Ethereum network and try connecting the wallet again or text in Support'
              })
              break
          }
          cardsStore.setCurrentCard(ECards.notification)
          return
        }

        cardsStore.setNotification({
          type: ENotificationType.success,
          title: 'Transfer Completed',
          //@ts-expect-error: can't be undefined at this point
          subtitle: `There are now ${this._tokenAmount} ${this._currentToken?.name} in ${cropLongStrings(connectionStore._evm.address)} wallet.`,
          description: 'For security reasons, please wait a minute before making a new request'
        })
        cardsStore.setCurrentCard(ECards.notification)
      } catch(e) {
        console.log(e)
      }
    },
    setTokenBalance(token: Token, balance: string) {
      const result = this._tokenList.map(item => item.address === token.address
        ? ({
            ...item,
            balance
          })
        : item)

      this.setTokenList(result)
    },
    setNeonToken(chainId: number) {
      this._neonToken = {
        ...this._neonToken,
        chainId
      }
    },
    setTokenAmount(amount: number) {
      this._tokenAmount = amount
    },
    setTokenList(tokens: Token[]) {
      this._tokenList = tokens
    },
    setSupportedTokenList(tokenList: string[]) {
      this._supportedTokenList = tokenList
    },
    setCurrentToken(token: Token | null) {
      this._currentToken = token
    },
    clearStore() {}
  },
  getters: {
    tokenList: ({ _tokenList }) => _tokenList,
    currentToken: ({ _currentToken }) => _currentToken,
  }
})