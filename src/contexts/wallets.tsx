import { createContext, useCallback, useEffect, useState } from 'react'
import { CHAIN_IDS, EIP6963EventNames, SupportedWallets, addChain } from '../utils'

import type { NotificatorData } from '../components/TokenGetter/types'

interface WalletContextType {
  connectedWallet: string;
  injectedProviders: Map<string, EIP6963ProviderDetail>;
  currentProvider: EIP1193Provider | null;
  notification: NotificatorData | null;
  setNotification: (data: NotificatorData | null) => void;
  handleConnectWallet: (wallet: EIP6963ProviderDetail) => void;
  disconnectWallet: () => void;
}

export const WalletContext = createContext<WalletContextType>({
    connectedWallet: '',
    injectedProviders: new Map(),
    currentProvider: null,
    notification: null,
    setNotification: () => {},
    handleConnectWallet: (wallet: EIP6963ProviderDetail) => {},
    disconnectWallet: () => {}
})

export const WalletProvider = ({ children }) => {
    const [injectedProviders, setInjectedProviders] = useState<Map<string, EIP6963ProviderDetail> | null>(new Map())
    const [supportedProviders, setSupportedProviders] = useState<Map<string, EIP1193Provider> | null>(new Map())
    const [connectedWallet, setConnectedWallet] = useState<string>('')
    const [currentProvider, setCurrentProvider] = useState<EIP1193Provider | null>(null)
    const [notification, setNotification] = useState<NotificatorData | null>(null)

    const onAnnounceProvider = useCallback(
      (event: EIP6963AnnounceProviderEvent) => {
        const { icon, rdns, uuid, name } = event.detail.info;

        if (!icon || !rdns || !uuid || !name) {
          console.error('Error: invalid eip6963 provider info received!');
          return;
        }

        if (Object.values(SupportedWallets).includes(rdns as SupportedWallets)) {
          setInjectedProviders(new Map(injectedProviders.set(rdns, event.detail)));
          setSupportedProviders(new Map(supportedProviders.set(rdns, event.detail.provider)));
        }
      },
      [injectedProviders, supportedProviders, setInjectedProviders, setSupportedProviders]
    );

    const connectNetwork = async (provider: EIP1193Provider) => {
      try {
        const accounts = await provider.request({ method: 'eth_requestAccounts' }) as string[]
        const chainId = await provider.request({ method: 'eth_chainId' })

        const neonNetwork = CHAIN_IDS.devnet
        const responseNetwork = Number(chainId)
        if (accounts.length && responseNetwork !== neonNetwork) {
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
        }

        setConnectedWallet(accounts[0])
      } catch (e) {
        console.error(e)
        setNotification({ success: false, details: 'Failed to connect to the NEON network' })
      }
    }

    const handleConnectWallet = (wallet: EIP6963ProviderDetail): void => {
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

    const disconnectWallet = () => {
        setCurrentProvider(null)
        setConnectedWallet('')
    }

    return (
        <WalletContext.Provider value={{ connectedWallet, currentProvider, handleConnectWallet, injectedProviders, notification, setNotification, disconnectWallet }}>
            {children}
        </WalletContext.Provider>
    )
}
