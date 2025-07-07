<template>
  <div class='w-full sm:w-2/3 max-w-menu px-6 flex items-center'>
    <div class='flex items-center justify-between'>
      <div class="w-8 max-w-8 min-h-8 h-8 max-h-8 min-h-8 z-10">
        <TokenIcon large v-if="!!currentToken" :src="currentToken.logoURI" :alt="currentToken.name"/>
      </div>
    </div>
    <div class='w-full h-full' :class="!completed ? 'pending gradient-progress' : ''">
      <div class="w-full h-full flex justify-center items-center bg-center">
        <div class='w-full h-connector -ml-1 bg-green'></div>
        <SuccessIcon v-if="completed" class='size-12.5 mx-0.5'/>
        <div class='w-full h-connector -mr-1' :class="completed ? 'bg-green' : ''"></div>
      </div>
    </div>
    <div class="rounded-full p-2 bg-gray-300" :class="completed ? 'border border-green' : ''">
      <WalletIcon />
    </div>
  </div>
</template>

<script setup lang="ts">
import {storeToRefs } from 'pinia'
import { useTokensStore } from '@/stores'

import WalletIcon from '@/components/icons/Wallet.vue'
import SuccessIcon from '@/components/icons/Success.vue'
import TokenIcon from '@/components/common/TokenIcon.vue'

const tokensStore = useTokensStore()
const { currentToken } = storeToRefs(tokensStore)

defineProps({
  completed: {
    type: Boolean,
  }
});
</script>

<style scoped>
.pending {
  animation: pulse 1s linear infinite;
}

.gradient-progress {
  background: radial-gradient(
    25% 100% at 50% 50%,
    #47CD89 0%,
    transparent 25%,
    transparent 50%,
    transparent 70%,
    transparent 100%
  )
}

@keyframes pulse {
  0% {
    background-size: 100%;
  }

  50% {
    background-size: 105%;
  }

  100% {
    background-size: 100%;
  }
}
</style>