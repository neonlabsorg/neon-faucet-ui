export interface NeonWallet {
  id: string
  name: string
}

export const NEON = 'NEON'

export interface NeonTokenBalance {
  decimals: number;
  formatted: string;
  symbol: string;
  value: bigint;
}

export const walletConnectMetadata = (websiteUrl: string) => ({
  name: 'Neon EVM Onboarding portal',
  description:
    'Neon EVM is an Ethereum Virtual Machine (EVM) that allows developers to build and deploy Ethereum-native dApps on Solana, all from their existing codebase.',
  url: websiteUrl,
  icons: ['https://avatars.githubusercontent.com/u/37784886']
})

export const NEON_WALLETS: NeonWallet[] = [
  {
    id: `7674bb4e353bf52886768a3ddc2a4562ce2f4191c80831291218ebd90f5f5e26`,
    name: `Math`
  },
  {
    id: `4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0`,
    name: `Trust`
  },
  {
    id: `c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96`,
    name: `Metamask`
  },
  {
    id: `19177a98252e07ddfc9af2083ba8e07ef627cb6103467ffebb3f8f4205fd7927`,
    name: `Ledger`
  }
]

export const EXCLUDED_WALLETS: string[] = [
  `a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393`,
  `2bd8c14e035c2d48f184aaa168559e86b0e3433228d3c4075900a221785019b0`
]

