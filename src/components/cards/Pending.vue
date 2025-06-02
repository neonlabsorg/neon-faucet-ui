<template>
  <CommonCard>
    <div class='w-full flex gradient-card items-center gap-6 flex-col py-14'>
      <TransferBanner />
      <div class='flex flex-col items-center'>
        <h3 class='text-white-200 text-xl font-medium'>
          Transfer in progress...
        </h3>
        <span class='text-gray-200'>It may take up to 2-3min</span>
      </div>
    </div>
  </CommonCard>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCardsStore } from '@/stores'

import CommonCard from '@/components/common/CommonCard.vue'
import TransferBanner from '@/components/common/TransferBanner.vue'
import { ECards, ENotificationType } from '@/stores/cards.ts'

const cardsStore = useCardsStore()

onMounted(() => {
  setTimeout(() => {
    cardsStore.setCurrentCard(ECards.notification)
    cardsStore.setNotification({
      type: ENotificationType.success,
      title: 'Transfer Completed',
      subtitle: 'There are now 50 NEON in 0x135...8F57 wallet.',
      description: 'For security reasons, please wait a minute before making a new request'
    })
  }, 3000)
})
</script>
