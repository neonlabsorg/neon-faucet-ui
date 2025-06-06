import {EXCLUDED_WALLETS, NEON_WALLETS, walletConnectMetadata} from '@/models'
import { createAppKit } from '@reown/appkit/vue'
import { neonDevnet } from '@/models'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'

export default () => {
  const projectId = import.meta.env.VITE_REOWN_PROJECT_ID
  console.log(`Project id: ${projectId}`)

  let websiteUrl = ''

  if (window) {
    websiteUrl = window.location.href
  }

  const metadata = walletConnectMetadata(websiteUrl)

  const initAppKit = () => {
    return createAppKit({
      adapters: [new EthersAdapter()],
      networks: [neonDevnet],
      metadata,
      projectId,
      enableEIP6963: true,
      allWallets: 'HIDE',
      featuredWalletIds: NEON_WALLETS.map((w) => w.id),
      includeWalletIds: NEON_WALLETS.map((w) => w.id),
      excludeWalletIds: EXCLUDED_WALLETS,
      enableWalletConnect: true,
      features: {
        email: false,
        socials: false,
        swaps: false,
        onramp: false
      }
    })
  }

  return { initAppKit }
}
