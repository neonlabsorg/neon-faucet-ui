<template>
  <CommonCard>
    <div class="w-full flex flex-col gap-1">
      <TokenSelect/>
      <AmountInput v-model:amount="tokenAmount" :inputError="inputError" />
      <span v-if="inputError" class="text-sm text-red pl-4">{{ inputError.message }}</span>
    </div>
    <button
      class='w-full text-white-100 text-lg font-semibold px-6 py-3.5 rounded-full'
      :class="buttonIsDisabled ? 'bg-violet-100 cursor-not-allowed' : 'bg-pink cursor-pointer'"
      :disabled="buttonIsDisabled"
      @click="handleSendTokens"
    >
      Send Test Tokens
    </button>
  </CommonCard>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

import useTokenBalance from '@/composables/useTokenBalance.ts'
import { useCardsStore, useTokensStore } from '@/stores'
import { TOKEN_TRANSFER_LIMIT } from '@/models'
import { ECards } from '@/stores/cards.ts'

import CommonCard from '@/components/common/CommonCard.vue'
import TokenSelect from '@/components/common/TokenSelect.vue'
import AmountInput from '@/components/common/AmountInput.vue'

const tokenAmount = ref<number | null >(null)
const inputError = ref<{ message: string } | null >(null)
const buttonIsDisabled = computed(() => !!inputError.value || !currentToken.value || !tokenAmount.value)

const tokensStore = useTokensStore()
const cardsStore = useCardsStore()
const { currentToken, tokenList } = storeToRefs(tokensStore)

const { getTokensBalance } = useTokenBalance()

watch(tokenAmount, () => {
  if(tokenAmount.value && tokenAmount.value > TOKEN_TRANSFER_LIMIT) {
    inputError.value = { message: 'Limit for airdrop is 100 tokens per minute' }
  } else {
    inputError.value = null
  }
})

const handleSendTokens = () => {
  if (tokenAmount.value) {
    tokensStore.setTokenAmount(tokenAmount.value)
    tokensStore.sendAirdrop()
    cardsStore.setCurrentCard(ECards.pending)
  }
}

onMounted(async () => {
  await tokensStore.getFaucetTokenList()
  await tokensStore.getTokenList()

  for await (const token of tokenList.value) {
    const balance = await getTokensBalance(token)
    tokensStore.setTokenBalance(token, balance)
  }
})
</script>