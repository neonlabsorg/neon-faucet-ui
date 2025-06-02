<template>
  <img :class="large ? 'w-8 h-8' : 'w-6 h-6'" :src="imageSrc" :alt="alt"/>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { isValidUrl } from '@/utils'

const BASE_URL = import.meta.env.VITE_TOKEN_ICONS_BASE_URL || 'https://static.neon-token-list-service.neonevm.org'

const imageSrc = ref<string>('')

const props = defineProps({
  large: Boolean,
  src: {
    type: String,
    required: true
  },
  alt: String
})

onMounted(() => {
  imageSrc.value = isValidUrl(props.src) ? props.src : `${BASE_URL}/icons/${props.src}`;
})
</script>