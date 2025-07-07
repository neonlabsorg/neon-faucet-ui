

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import useClickOutside from '@/composables/useClickOutside';
import useNumberInputMask from '@/composables/useNumberInputMask'

import App from './App.vue'
import './assets/main.css'

const clickOutside = useClickOutside();
const numberInputMask = useNumberInputMask()

createApp(App)
  .use(createPinia())
  .directive('click-outside', clickOutside)
  .directive('input-number', numberInputMask)
  .mount('#app')
