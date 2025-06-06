<template>
  <transition
    enter-active-class="transition ease-out duration-300 transform "
    enter-from-class="opacity-0 translate-y-10 scale-95"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="ease-in duration-200"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 translate-y-10 translate-y-0 scale-95"
  >
    <div v-show="isVisible" class="flex justify-center pt-4 z-[100]">
      <div
        class="flex bg-violet-200 justify-between items-center rounded-md py-4 px-4 border border-gray-400 text-gray-100"
      >
        <div class="flex gap-2 items-center">
          <span v-if="notification.type">
            <component class="size-6" :is="iconComponent"></component>
          </span>
          <div class="flex flex-col gap-2 text-base fornt-semibold">
            <span v-html="notification.title" />
          </div>
          <span v-show="isClosable">
            <component :is="null"  @click="handleClose" class="cursor-pointer" ></component>
          </span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, shallowRef, watch } from 'vue'
import { useNotificationStore } from '@/stores'
import { storeToRefs } from 'pinia'
import type { ComponentPublicInstance } from 'vue'

const notificationsStore = useNotificationStore()
const { notification } = storeToRefs(notificationsStore)

const iconComponent = shallowRef<ComponentPublicInstance | null>(null)

const isVisible = computed(() => notification.value.isVisible)
const isClosable = computed(() => !!notification.value.closable)

const handleClose = () => {
  notificationsStore.closeNotification()
}

watch(notification, () => {
  iconComponent.value = defineAsyncComponent(() => import((`@/components/icons/${notification.value.type}.vue`)))
})
</script>
