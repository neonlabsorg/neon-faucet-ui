import axios from 'axios'
import { neonDevnet, FAUCET_URL, type Token } from '@/models'

const TOKEN_LIST_BASE_URL = 'https://neon-token-list-service-backend.neonevm.org/api/v1'

type AirdropPayload = {
  amount: number
  wallet: string
}

export const TokensApi = {
  postTokenAirdrop: async (token: Token, payload: AirdropPayload) => {
    const url = token.symbol === 'NEON' ? `${FAUCET_URL}/request_neon` : `${FAUCET_URL}/request_erc20`

    try {
      const { data } = await axios.post(url, payload)

      return data
    } catch(e) {
      //@ts-expect-error: fix this
      console.log(e.code)
      return { error: e }
    }
  },
  getFaucetTokens: async () => {
    try {
      const { data } = await axios.get(`${FAUCET_URL}/request_erc20_list`)

      return data
    } catch(e) {
      return { error: e }
    }
  },
  getTokens: async () => {
    try {
      const { data } = await axios.get(`${TOKEN_LIST_BASE_URL}/tokens/${neonDevnet.id}`, {
        params: {
          isValid: true,
        },
      })

      return data
    } catch (e) {
      return { error: e }
    }
  },
}