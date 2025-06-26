<template>
  <div v-click-outside="handleCloseMenu">
    <MenuLogo class='cursor-pointer' @click='toggleNavigation' />
    <div v-if="menuVisible" class="absolute top-4/4 right-6 sm:right-13 bg-violet-300">
      <div class='flex flex-col py-1 px-1.5 border border-violet-100 rounded-lg text-gray-100 w-menu'>
        <a v-for="item in menuItems" :href="item.url" target="_blank" class='flex gap-2 items-center p-2.5 hover:bg-violet-100 rounded-lg cursor-pointer font-medium' :key='item.label'>
          <component :is="item.Icon"/>
          {{ item.label }}
        </a>
        <div class="p-2">
          <a href="https://discord.com/invite/neonevm" target="_blank" class='w-full flex gap-2 justify-center items-center px-3 py-2 border border-gray-200 rounded-full bg-violet-200 text-sm font-semibold'>
            <Support />
            Support
          </a>
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
    url: 'https://neonevm.org/docs/faq/neon-brief-faq',
    Icon: Fqa,
  },
  {
    label: 'Docs',
    url: 'https://neonevm.org/docs/quick_start',
    Icon: Docs,
  },
  {
    label: 'Twitter',
    url: 'https://x.com/Neon_EVM',
    Icon: Twitter,
  },
  {
    label: 'Discord Community',
    url: 'https://discord.com/invite/neonevm',
    Icon: Discord,
  },
  {
    label: 'About Neon',
    url: 'https://www.neonevm.org/blog',
    Icon: About,
  },
  {
    label: 'NeonPass Bridge',
    url: 'https://neonpass.live',
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