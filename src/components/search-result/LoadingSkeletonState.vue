<template>
  <div
    class="columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-8 space-y-5"
  >
    <div
      v-for="(key, index) in total"
      :key="index"
      class="w-[290px] h-[195px] relative overflow-hidden animate-pulse rounded-md bg-secondary"
    ></div>
  </div>
</template>

<script setup lang="ts">
const total = Array.from({ length: 12 })
</script>
