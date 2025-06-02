<template>
  <section class="w-full">
    <div v-click-outside="handleDropdownClose" class="w-full relative inline-block text-left">
      <button
        @click="toggleDropdown"
        class="w-full flex justify-between items-center bg-violet-200 border border-violet-100 text-base rounded-2xl font-medium text-white-200 cursor-pointer px-4 py-7"
      >
        <div class="flex items-center gap-1">
          <TokenIcon v-if="!!currentToken" :src="currentToken.logoURI" :alt="currentToken.name" :key="currentToken.logoURI"/>
          <span v-if="!!currentToken">{{ currentToken.name }}</span>
          <span v-else>Select token</span>
        </div>
        <span class="pl-4">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="fill-current"
          >
            <path
              d="M10 14.25C9.8125 14.25 9.65625 14.1875 9.5 14.0625L2.3125 7C2.03125 6.71875 2.03125 6.28125 2.3125 6C2.59375 5.71875 3.03125 5.71875 3.3125 6L10 12.5312L16.6875 5.9375C16.9688 5.65625 17.4063 5.65625 17.6875 5.9375C17.9687 6.21875 17.9687 6.65625 17.6875 6.9375L10.5 14C10.3437 14.1563 10.1875 14.25 10 14.25Z"
            />
          </svg>
        </span>
      </button>
      <div
        v-show="dropdownOpen"
        class="shadow-1 absolute bg-violet-200 left-0 px-2 z-40 mt-2 w-full rounded-2xl border border-violet-100 py-[10px] transition-all text-white-200"
        :class="{
          'top-full opacity-100 visible': dropdownOpen,
          'top-[110%] invisible opacity-0': !dropdownOpen
        }"
      >
        <template v-for="item in tokenList" :key="item.address">
          <div @click="handleTokenSelect(item)" class="flex justify-between items-center px-2 py-2.5 hover:bg-violet-100 rounded-md cursor-pointer">
            <div class="flex items-center gap-2 text-base text-dark-5 hover:text-white">
              <TokenIcon :src="item.logoURI" :alt="item.name" />
              {{ item.name }}
            </div>
            <div class="flex items-center gap-2">
              <span class="text-gray-500">1</span>
              <div class="h-5 w-5">
                <CheckIcon  v-if="item.address === currentToken?.address" />
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTokensStore } from '@/stores'

import type { Token } from '@/models'

import TokenIcon from '@/components/common/TokenIcon.vue'
import CheckIcon from '@/components/icons/Check.vue'

const dropdownOpen = ref(false)

const tokensStore = useTokensStore()
const { currentToken, tokenList } = storeToRefs(tokensStore)

const handleTokenSelect = (token: Token) => {
  tokensStore.setCurrentToken(token)
  handleDropdownClose()
}

const handleDropdownClose =  () => {
  dropdownOpen.value = false
}

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

watch(tokenList, () => {
  console.log(tokenList.value)
})
</script>