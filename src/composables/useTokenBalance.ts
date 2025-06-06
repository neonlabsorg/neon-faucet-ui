import ERC20_ABI from '@/abi/erc20.json'
import { Contract } from 'ethers'
import type { Token } from '@/models'
import { useConnectionStore } from '@/stores'
import { toRaw } from 'vue'
import { NEON_TOKEN_MINT_DECIMALS, NEON } from '@/models'
import { Big } from 'big.js'
import { useAppKitBalance } from '@reown/appkit/vue'

import type { NeonTokenBalance } from '@/models'

export default () => {

  const getTokensBalance = async (token: Token, method = 'balanceOf') => {
    const connectionStore = useConnectionStore()
    const { fetchBalance } = useAppKitBalance()

    if (token.symbol === 'NEON') {
      const { data } = await fetchBalance()

      return data?.balance ? parseFloat(data.balance).toFixed(5) : '0'
    }

    try {
      const provider = toRaw(connectionStore.provider)
      //@ts-expect-error: fix this
      const signer = await provider?.getSigner();
      const tokenContract = new Contract(token.address, ERC20_ABI, signer);

      const result: NeonTokenBalance = {
        value: 0n,
        symbol: NEON,
        decimals: NEON_TOKEN_MINT_DECIMALS,
        formatted: ''
      };
      if (tokenContract['balanceOf']) {
        const m = tokenContract[method];
        const b = await m(signer.address);
        const value = typeof b === 'bigint' ? b : 0n;
        result.value = value;
        result.formatted = new Big(value.toString()).div(Big(10).pow(token.decimals)).toString();
      }

      return result.formatted
    } catch(e) {
      console.log(e)
      return '0'
    }
  }

  return { getTokensBalance }
}