<template>
  <main class="h-full w-full flex flex-col gap-6 justify-center items-center px-6">
    <h1 class="text-white-100 text-xl font-semibold">Neon EVM Devnet Faucet</h1>
    <component @open="handleModalOpen" :is="stepContent"></component>
  </main>
</template>

<script setup lang="ts">
import { shallowRef, defineAsyncComponent, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { useCardsStore } from '@/stores'

const cardsStore = useCardsStore()
const { currentCard } = storeToRefs(cardsStore)

const stepContent = shallowRef()

watch(currentCard, () => {
  stepContent.value = defineAsyncComponent(() => import((`@/components/cards/${currentCard.value}.vue`)))
})

onMounted(() => {
  stepContent.value = defineAsyncComponent(() => import((`@/components/cards/${currentCard.value}.vue`)))
})

defineProps({
  handleModalOpen: Function
})
</script>