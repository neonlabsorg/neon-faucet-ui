import { defineStore } from 'pinia'


interface IConnectionState {
  _evm: EvmConnection,
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
  error: ''
};

const initialState = {
  _evm: { ...evmDefaultConnection, chainId: undefined },
}
export const useConnectionStore = defineStore('connection', {
  state: (): IConnectionState => initialState,
  actions: {
    clearStore(): void {
      this._evm = { ...evmDefaultConnection, chainId: undefined }
    },
    setEvmConnection(evmConnection: {
      address: string
      connected: boolean
      chainId: number
    }): void {
      this._evm = evmConnection
    },
  },
  getters: {
    evmWalletAddress: ({ _evm }) => _evm.address,
    chainId: ({ _evm }) => _evm.chainId,
    isWalletConnected: ({ _evm }) => _evm.connected,
  }
})