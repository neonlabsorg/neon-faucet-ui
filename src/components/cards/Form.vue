<template>
  <CommonCard>
    <div class="w-full flex flex-col gap-1">
      <TokenSelect/>
      <AmountInput v-model:amount="tokenAmount" :inputError="inputError" />
      <span v-if="inputError" class="text-sm text-red pl-4">{{ inputError }}</span>
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

import { useCardsStore, useTokensStore } from '@/stores'
import { TOKEN_TRANSFER_LIMIT } from '@/models'
import { ECards } from '@/stores/cards.ts'

import CommonCard from '@/components/common/CommonCard.vue'
import TokenSelect from '@/components/common/TokenSelect.vue'
import AmountInput from '@/components/common/AmountInput.vue'

const tokenAmount = ref<number | null>(null)
const inputError = ref<string>('')
const buttonIsDisabled = computed(() => !(tokenAmount.value && tokenAmount.value <= TOKEN_TRANSFER_LIMIT) || !currentToken.value)

const tokensStore = useTokensStore()
const cardsStore = useCardsStore()
const { currentToken } = storeToRefs(tokensStore)

watch(tokenAmount, () => {
  if(tokenAmount.value && tokenAmount.value > TOKEN_TRANSFER_LIMIT) {
    inputError.value = 'Limit for one airdrop is 100 tokens per minute'
  } else {
    inputError.value = ''
  }
})

const handleSendTokens = () => {
  if (tokenAmount.value && tokenAmount.value <= TOKEN_TRANSFER_LIMIT) {
    tokensStore.setTokenAmount(tokenAmount.value)
    cardsStore.setCurrentCard(ECards.pending)
  } else {
    inputError.value = 'Maximum limit for one airdrop is 100 tokens per minute'
  }
}

onMounted(() => {
  tokensStore.getTokenList()
})
</script>