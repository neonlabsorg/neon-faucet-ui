<template>
  <div class='flex gap-4 items-center rounded-xl py-2 px-4 bg-violet-200 cursor-pointer'>
    <span class='text-sm'>{{ cropLongStrings(evmWalletAddress) }}</span>
    <AccessIcon />
  </div>
</template>
<script setup lang="ts">
import AccessIcon from '@/components/icons/Access.vue'
import { cropLongStrings } from '@/utils'

defineProps({
  evmWalletAddress: {
    type: String,
    required: true
  }
})
</script>