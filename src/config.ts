import Bowser from 'bowser'

import type {EIP1193Provider, NetworkConfig, EIP6963ProviderDetail} from './types'

export const FAUCET_URL = 'https://api.neonfaucet.org'

export const REQUEST_LIMIT_SEC = 60

export const isMobile = () => {
  const browser = Bowser.parse(window.navigator.userAgent)
  return browser.platform.type === 'mobile'
}

/**
 * @title EIP6963EventNames
 *
 * Defining EIP-6963 event names.
 *
 * @remarks
 *
 * Check standard EIP-6963 for more information.
 * {@link https://eips.ethereum.org/EIPS/eip-6963}
 */
export enum EIP6963EventNames {
  Announce = "eip6963:announceProvider",
  Request = "eip6963:requestProvider",
}
export enum SupportedChainIds {
  NEON_DEVNET = 245022926,
  NEON_MAINNET = 245022934,
}

export enum SupportedWallets {
  METAMASK = 'io.metamask',
  RABBY = 'io.rabby',
  TRUST = 'com.trustwallet.app',
  MATH = 'com.mathglobal.mathwallet'
}
export function isSupportedChain(
  chainId: number | null | undefined
): chainId is SupportedChainIds {
  if (!chainId) return false
  return !!SupportedChainIds[chainId]
}
export function isSupportedWallet(provider: Map<string, EIP6963ProviderDetail>): boolean {
  return provider.has(SupportedWallets.METAMASK)
}
export const addChain = async (chainInfo: NetworkConfig, provider: EIP1193Provider) => {
  await provider.request({
    method: "wallet_addEthereumChain",
    params: [chainInfo],
  })
};
