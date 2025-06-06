import { defineStore } from 'pinia'
import type { BrowserProvider } from 'ethers'


interface IConnectionState {
  _evm: EvmConnection,
  _provider: typeof BrowserProvider | null
}

type EvmConnectionState = {
  connected: boolean
  address?: string
  error?: string
}

type EvmConnection = EvmConnectionState & {
  chainId: number | undefined
}

const evmDefaultConnection = {
  connected: false,
  address: undefined,
  provider: undefined,
  error: ''
};

const initialState = {
  _evm: { ...evmDefaultConnection, chainId: undefined },
  _provider: null,
}
export const useConnectionStore = defineStore('connection', {
  state: (): IConnectionState => initialState,
  actions: {
    clearStore(): void {
      this._evm = { ...evmDefaultConnection, chainId: undefined }
    },
    setProvider(provider: typeof BrowserProvider) {
      this._provider = provider
    },
    setEvmConnection(evmConnection: {
      address: string
      connected: boolean
      chainId: number
    }): void {
      this._evm = {...this._evm, ...evmConnection }
    },
  },
  getters: {
    provider: ({ _provider }) => _provider,
    evmWalletAddress: ({ _evm }) => _evm.address,
    chainId: ({ _evm }) => _evm.chainId,
    isWalletConnected: ({ _evm }) => _evm.connected,
  }
})