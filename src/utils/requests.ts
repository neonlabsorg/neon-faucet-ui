import { SPLToken } from "./models";

export const addChain = async (chainInfo: NetworkConfig, provider: EIP1193Provider) => {
  await provider.request({
    method: "wallet_addEthereumChain",
    params: [chainInfo],
  })
}

export const addTokenToWallet = async (token: SPLToken, provider: EIP1193Provider) => {
  const { address, symbol, decimals, logoURI: image } = token
  await provider.request({
    method: 'wallet_watchAsset',
    params: { type: 'ERC20', options: { address, symbol, decimals, image } }
  })
}
