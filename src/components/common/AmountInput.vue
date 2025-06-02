<template>
  <div
    class="w-full bg-violet-200 py-4 px-4 text-white rounded-2xl"
    :class="inputError ? 'border border-red' : 'border border-violet-100'"
  >
    <label :class="inputError ? 'text-red' :'text-gray-200'" for="amount">Amount</label>
    <input
      id="amount"
      class="w-full outline-none bg-violet-200"
      type="text"
      v-model.number="amount"
    />
  </div>
</template>

<script setup lang="ts">
const amount = defineModel('amount')
defineProps({
  inputError: String
})
</script>