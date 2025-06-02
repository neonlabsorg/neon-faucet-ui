import { defineStore } from 'pinia';
import { TokensApi } from '@/api/tokens.ts'

import type { Token } from '@/models'

interface ITokensState {
  _currentToken: Token | null
  _tokenAmount: number
  _tokenList: Token[]
}

const initialState = {
  _currentToken: null,
  _tokenAmount: 0,
  _tokenList: []
}

export const useTokensStore = defineStore('tokens',{
  state: (): ITokensState => initialState,
  actions: {
    async getTokenList() {
      try {
        const { data } = await TokensApi.getTokens()

        this.setTokenList(data)
      } catch(e) {
        console.log(e)
      }
    },
    setTokenAmount(amount: number) {
      this._tokenAmount = amount
    },
    setTokenList(tokens: Token[]) {
      this._tokenList = tokens
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