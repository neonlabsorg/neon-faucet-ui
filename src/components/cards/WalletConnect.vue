<template>
  <CommonCard>
    <FaucetIcon />
    <p class='text-gray-200 font-medium text-center'>
      Neon's Faucet provides NEON and ERC-20 test tokens for testing your apps on the Neon EVM Devnet.
    </p>
    <button
      class='w-full text-white-100 text-lg font-semibold px-6 py-3.5 bg-pink rounded-full cursor-pointer'
      @click='$emit("open")'
    >
      Connect wallet
    </button>
  </CommonCard>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useConnectionStore, useCardsStore } from '@/stores'
import CommonCard from '@/components/common/CommonCard.vue'
import FaucetIcon from '@/components/icons/Faucet.vue'
import { watch } from 'vue'
import { ECards } from '@/stores/cards.ts'

const connectionStore = useConnectionStore()
const cardsStore = useCardsStore()

const { isWalletConnected } = storeToRefs(connectionStore)

watch(isWalletConnected,() => {
  if (isWalletConnected.value) {
    cardsStore.setCurrentCard(ECards.form)
  }
})
defineEmits(['open'])
</script>