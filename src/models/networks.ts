import { NEON } from '@/models/wallets.ts'
import { defineChain } from '@reown/appkit/networks'

export const neonDevnet = defineChain({
  id: 245022926,
  caipNetworkId: 'eip155:245022926',
  chainNamespace: 'eip155',
  name: 'Neon EVM (DevNet)',
  nativeCurrency: {
    decimals: 18,
    name: 'Neon',
    symbol: NEON
  },
  blockExplorers: {
    default: {
      name: 'Neonscan',
      url: 'https://neon-devnet.blockscout.com'
    }
  },
  rpcUrls: {
    default: {
      http: ['https://devnet.neonevm.org']
    }
  },
  contracts: {
    multicall3: {
      address: '0x5238c694a8db837fff8c4068859e765b978a7607',
      blockCreated: 205206112
    }
  }
})