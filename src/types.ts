export type EIP6963ProviderInfo = {
    uuid: string
    name: string
    icon: string
    rdns: string
}

export type EIP1193Provider = {
    request: (payload: { method: string; params?: unknown[] | object }) => Promise<unknown>
}

/**
 * Represents a provider and the information relevant for the dapp.
 *
 * @type EIP6963ProviderDetail
 * @property info - The EIP6963ProviderInfo object.
 * @property provider - The provider instance.
 *
 * @remarks
 *
 * Check standard EIP-6963 for more information.
 * {@link https://eips.ethereum.org/EIPS/eip-6963}
 */
export type EIP6963ProviderDetail = {
    info: EIP6963ProviderInfo
    provider: EIP1193Provider
}

export type EIP6963AnnounceProviderEvent = Event & {
    detail: EIP6963ProviderDetail
}

export type NetworkConfig = {
    chainName: string
    nativeCurrency: {
        name: string
        symbol: string
        decimals: number
    }
    chainId: string
    rpcUrls: string[]
    blockExplorerUrls: string[]
}

