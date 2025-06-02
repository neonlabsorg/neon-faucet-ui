
import useClickOutside from '@/composables/useClickOutside';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import './assets/main.css'

const clickOutside = useClickOutside();

createApp(App)
  .use(createPinia())
  .directive('click-outside', clickOutside)
  .mount('#app')
