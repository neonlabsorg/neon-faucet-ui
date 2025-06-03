import axios from 'axios'
import { neonDevnet } from '@/models'

const TOKEN_LIST_BASE_URL = 'https://neon-token-list-service-backend.neonevm.org/api/v1'

export const TokensApi = {
  postTokenAirdrop: async () => {},
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