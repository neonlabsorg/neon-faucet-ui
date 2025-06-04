<template>
  <Header @open="handleModalOpen" />
  <Main :handleModalOpen="handleModalOpen" />
  <Notification class="fixed bottom-4 left-4 max-w-[90%]" />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { AppKit, useAppKitAccount, useAppKitEvents } from '@reown/appkit/vue'

import useEvmWalletConnect from '@/composables/useEvmWalletConnect.ts'
import { useCardsStore, useConnectionStore, useNotificationStore, useTokensStore } from '@/stores'
import { neonDevnet } from '@/models'

import Header from '@/components/layout/Header.vue'
import Main from '@/components/layout/Main.vue'
import Notification from '@/components/common/Notification.vue'
import { ECards } from '@/stores/cards.ts'
import { BrowserProvider } from 'ethers'

const wcModal = ref<AppKit | null>(null)

const cardsStore = useCardsStore()
const tokensStore = useTokensStore()
const connectionStore = useConnectionStore()
const notificationStore = useNotificationStore()

const { initAppKit } = useEvmWalletConnect()
const { isWalletConnected } = storeToRefs(connectionStore)

const handleModalOpen = () => {
  wcModal.value?.open()

}

onMounted(() => {
  wcModal.value = initAppKit()
  wcModal.value?.subscribeProviders((data) => {
    if(data.eip155) {
      const provider = new BrowserProvider(data.eip155)
      connectionStore.setProvider(provider)
    }
  })

  const events = useAppKitEvents()
  const account = useAppKitAccount()

  watch(events, (newEvents) => {
    console.log('AppKit events changed:', newEvents)

    if (account.value.address) {
      const { address, isConnected, caipAddress } = account.value

      if(!isWalletConnected.value) {
        wcModal.value?.close()
      }

      if (isConnected) {
        const chainId = Number(caipAddress?.split(':')[1])

        tokensStore.setNeonToken(chainId)
        connectionStore.setEvmConnection({
          address,
          connected: isConnected,
          chainId: neonDevnet.id
        })
      }

      console.log('Account updated after event:', account.value)
    } else {
      notificationStore.setNotification({
        type: 'Success',
        title: 'EVM Wallet disconnected'
      })
      cardsStore.setCurrentCard(ECards.connect)
      connectionStore.clearStore()
    }
  }, { deep: true })
})
</script>

