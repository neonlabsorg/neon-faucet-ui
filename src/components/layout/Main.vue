<template>
  <main class="h-full w-full flex flex-col gap-6 justify-center items-center px-6">
    <h1 class="text-white-100 text-xl font-semibold">Neon EVM Devnet Faucet</h1>
    <component @open="handleModalOpen" :is="stepContent"></component>
    <CookieControl policy-url="https://neonevm.org/cookie-policy" :custom-class-list="cookieClassList" />
  </main>
</template>

<script setup lang="ts">
import { shallowRef, defineAsyncComponent, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { useCardsStore } from '@/stores'
import { CookieControl } from 'vue-shared-components'

const cardsStore = useCardsStore()
const { currentCard } = storeToRefs(cardsStore)

const stepContent = shallowRef()

const cookieClassList = {
  container:
    'cookie-banner w-[calc(100%-40px)] sm:w-72 absolute z-50 bottom-5 right-5 bg-violet-300 border border-violet-100 backdrop-filter backdrop-blur-xl rounded-lg p-5',
  title: 'text-pink text-lg pb-2',
  description: 'block text-xxs leading-light text-white-100 mb-2',
  policyUrl: 'text-pink underline hover:text-light-green',
  acceptCta: 'text-pink text-sm font-bold uppercase hover:text-light-green cursor-pointer',
  postponeCta: 'pl-4 text-gray-300 text-sm font-bold uppercase hover:text-grey_fw cursor-pointer'
}

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