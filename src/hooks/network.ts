import { useWeb3React } from '@web3-react/core'
import { useMemo } from 'react'

export const ChainId = {
  111: 'LOCAL',
  245022926: 'devnet',
  245022927: 'sol-devnet',
  245022940: 'testnet',
  245022934: 'mainnet-beta'
}

// export function useNetworkType() {
//   const { connector, isActive } = useWeb3React()
//   const { network, chainId } = useMemo(() => {
//     let network = '',
//       chainId = Number(connector.provider)
//     if (isActive) {
//       network =
//         library?.currentProvider && connector.provider.networkVersion
//           ? ChainId[library.currentProvider.networkVersion]
//           : 'disconnected'
//     } else {
//       network = 'disconnected'
//     }
//     return { network, chainId }
//   }, [isActive, library?.currentProvider])
//   return { network, chainId }
// }
