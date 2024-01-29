<template>
  <div
    class="columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-8 space-y-5"
  >
    <ImageItem v-for="rs in result" :resultItem="rs" :key="rs.seller.id" />
  </div>
</template>
<script setup lang="ts">
import ImageItem from './ImageItem.vue'
import type { SellerImage } from '@/lib/types'

const { result } = defineProps<{
  result: SellerImage[] | undefined
}>()
</script>
