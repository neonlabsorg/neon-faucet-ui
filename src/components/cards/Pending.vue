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

import CommonCard from '@/components/common/CommonCard.vue'
import TransferBanner from '@/components/common/TransferBanner.vue'

// onMounted(() => {
//   setTimeout(() => {
//     cardsStore.setCurrentCard(ECards.notification)
//     cardsStore.setNotification({
//       type: ENotificationType.error,
//       title: 'Something went wrong',
//       description: 'Please select the appropriate Ethereum network and try connecting the wallet again or text in Support'
//     })
//   }, 3000)
// })
</script>
