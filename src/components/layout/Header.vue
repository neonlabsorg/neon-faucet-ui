<template>
  <div class='w-full px-6 sm:px-13 py-4 flex justify-between items-center relative z-10'>
    <div class='cursor-pointer'>
      <MobileLogoIcon
        @click="handleLogoClick"
        class="sm:hidden"
      />
      <LogoIcon
        @click="handleLogoClick"
        class="hidden sm:flex"
      />
    </div>
    <div class='flex gap-6 items-center text-white'>
      <WalletChip v-if="evmWalletAddress && isWalletConnected" :evmWalletAddress="evmWalletAddress" @click='$emit("open")' />
      <NavigationMenu class="py-4" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCardsStore, useConnectionStore } from '@/stores'

import WalletChip from '@/components/common/WalletChip.vue'
import NavigationMenu from '@/components/common/NavigationMenu.vue'

import LogoIcon from '@/components/icons/Logo.vue'
import MobileLogoIcon from '@/components/icons/MobileLogo.vue'
import { ECards } from '@/stores/cards.ts'

const cardsStore = useCardsStore()
const connectionStore = useConnectionStore()
const { isWalletConnected, evmWalletAddress } = storeToRefs(connectionStore)

const handleLogoClick = () => {
  cardsStore.setCurrentCard(ECards.connect)
}

defineEmits(['open'])
</script>