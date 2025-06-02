<template>
  <CommonCard class="px-0 pb-0">
    <div class='w-full flex gradient-card items-center gap-6 flex-col pt-6 px-6'>
      <div v-if="notification?.type === ENotificationType.success" class='w-full flex gap-6 items-center flex-col'>
        <TransferBanner completed/>
        <div class='max-w-[200px] flex flex-col items-center'>
          <h3 class='text-white-200 text-xl font-medium'>
            {{ notification.title }}
          </h3>
          <span class='text-gray-200 text-center'>{{ notification.subtitle }}</span>
        </div>
      </div>
      <div v-if="notification?.type === ENotificationType.error" class='w-full flex gap-6 items-center flex-col'>
        <Error/>
        <div class='max-w-[200px] flex flex-col items-center'>
          <h3 class='text-white-200 text-xl font-medium'>
            {{ notification.title }}
          </h3>
          <span class='text-gray-200 text-center'>{{ notification.subtitle }}</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col justify-center gap-6 py-8 px-6 bg-violet-200 rounded-b-3xl">
      <p class="text-center text-gray-500">{{ notification?.description }}</p>
      <div class="w-full">

        <button
          class="w-full flex justify-center items-center gap-1 py-2.5 px-3.5 rounded-full "
          :disabled="isButtonDisabled"
          :class="isButtonDisabled ? 'bg-violet-100 text-gray-600 cursor-not-allowed' : 'bg-pink text-white cursor-pointer'"
          @click="handleGetMore"
        >
          <div v-if="isButtonDisabled" class="rounded-full border border-pink">
            <svg width="16" height="16">
              <circle cx="192" cy="8" r="3" stroke="#EE46BC" stroke-width="6" fill="none"
                      stroke-dasharray="19" :stroke-dashoffset="timer"
                      class="circle"
                      transform="rotate(-90,100,100)">
              </circle>
            </svg>
          </div>
          Get more test tokens
        </button>
      </div>
    </div>
  </CommonCard>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

import TransferBanner from '@/components/common/TransferBanner.vue'
import CommonCard from '@/components/common/CommonCard.vue'
import Error from '@/components/icons/Error.vue'

import { useCardsStore } from '@/stores'
import { ECards, ENotificationType } from '@/stores/cards.ts'

const isButtonDisabled = ref(true)
const timer = ref(19)
const interval = ref()

const cardsStore = useCardsStore()
const { notification } = storeToRefs(cardsStore)

const handleGetMore = () => {
  cardsStore.setCurrentCard(ECards.form)
}

watch(timer, () => {
  if (timer.value <= 0) {
    clearInterval(interval.value)
    isButtonDisabled.value = false
  }
})
onMounted(() => {
  interval.value = setInterval(() => {
    timer.value = timer.value - 0.3
  }, 1000)
})
</script>