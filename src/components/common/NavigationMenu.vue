<template>
  <div v-click-outside="handleCloseMenu">
    <MenuLogo class='cursor-pointer' @click='toggleNavigation' />
    <div v-if="menuVisible" class="absolute top-4/4 right-6 sm:right-13 bg-violet-300">
      <div class='flex flex-col py-1 px-1.5 border border-violet-100 rounded-lg text-gray-100 w-menu'>
        <div v-for="item in menuItems" class='flex gap-2 items-center p-2.5 hover:bg-violet-100 rounded-lg cursor-pointer font-medium' :key='item.label'>
          <component :is="item.Icon"/>
          {{ item.label }}
        </div>
        <div class="p-2">
          <button class='w-full flex gap-2 justify-center items-center px-3 py-2 border border-gray-200 rounded-full bg-violet-200 text-sm font-semibold'>
            <Support />
            Support
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { About, Discord, Docs, Fqa, Neon, Support, Twitter } from '@/components/icons/navigation'
import MenuLogo from '@/components/icons/Menu.vue'

const menuVisible = ref(false)

const menuItems = [
  {
    label: 'FQA',
    url: '#',
    Icon: Fqa,
  },
  {
    label: 'Docs',
    url: '#',
    Icon: Docs,
  },
  {
    label: 'Twitter',
    url: '#',
    Icon: Twitter,
  },
  {
    label: 'Discord Community',
    url: '#',
    Icon: Discord,
  },
  {
    label: 'About Neon',
    url: '#',
    Icon: About,
  },
  {
    label: 'NeonPass Bridge',
    url: '#',
    Icon: Neon,
  },
]

const toggleNavigation = () => {
  menuVisible.value = !menuVisible.value
}

const handleCloseMenu = () => {
  menuVisible.value = false
}
</script>