import { createContext, useEffect, useState } from 'react'
import { CHAIN_IDS } from '../connectors'
import { EIP6963EventNames, SupportedWallets, addChain } from '../config'

import type { 
    EIP1193Provider,
    EIP6963ProviderDetail,
    EIP6963AnnounceProviderEvent 
} from '../types'

export const WalletContext = createContext({
    connectedWallet: null,
    injectedProviders: new Map(),
    currentProvider: null,
    handleConnectWallet: (rdns: string) => {}
})

export const WalletProvider = ({ children }) => {
    const [injectedProviders, setInjectedProviders] = useState<Map<string, EIP6963ProviderDetail> | null>(new Map())
    const [supportedProviders, setSupportedProviders] = useState<Map<string, EIP1193Provider> | null>(new Map())
    const [connectedWallet, setConnectedWallet] = useState(null)
    const [currentProvider, setCurrentProvider] = useState(null)

    const onAnnounceProvider = (event: EIP6963AnnounceProviderEvent) => {
        const { icon, rdns, uuid, name } = event.detail.info
        
        if (!icon || !rdns || !uuid || !name) {
            console.error('Error: invalid eip6963 provider info received!')
            return
        }

        if (Object.values(SupportedWallets).includes(rdns)) {
            setInjectedProviders(new Map(injectedProviders.set(rdns, event.detail)))
            setSupportedProviders(new Map(supportedProviders.set(rdns, event.detail.provider)))
        }
    }

    const connectNetwork = async (provider: EIP1193Provider) => {
        const account = await provider.request({ method: 'eth_requestAccounts' })
        const neonNetwork = CHAIN_IDS.devnet
        
        try {
            const chainInfo = {
              chainName: 'Neon EVM (Devnet)',
              nativeCurrency: {
                name: 'NEON',
                symbol: 'NEON',
                decimals: 18
              },
              chainId: `0x${neonNetwork.toString(16)}`,
              rpcUrls: ['https://devnet.neonevm.org'],
              blockExplorerUrls: ['https://devnet.neonscan.org']
            }
    
            await addChain(chainInfo, provider)
        } catch(e) {
            console.log(e)
        }
        setConnectedWallet(account)
    }

    const handleConnectWallet = (wallet: unknown): void => {
        setCurrentProvider(wallet.provider)
        connectNetwork(supportedProviders.get(wallet.info.rdns))!
    }
    useEffect(() => {
        window.addEventListener(EIP6963EventNames.Announce, onAnnounceProvider);
        /*
        * Dispatch the request for EIP-6963 provider
        * The DApp dispatches a request event which will be heard by
        * Wallets code that had run earlier
        */
        window.dispatchEvent(new Event(EIP6963EventNames.Request));
    
        return () => {
            setInjectedProviders(null)
            window.removeEventListener(EIP6963EventNames.Announce, onAnnounceProvider)
        }
    }, [])
    return (
        <WalletContext.Provider value={{ connectedWallet, currentProvider, handleConnectWallet, injectedProviders }}>
            {children}
        </WalletContext.Provider>
    )
}