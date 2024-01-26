<template>
  <div
    class="columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-8 space-y-5"
  >
    <ImageItem v-for="image in images" :image="image" :key="image.id" />
  </div>
</template>
<script setup lang="ts">
import ImageItem from './ImageItem.vue'
import type { ImageResult } from '@/lib/types'

const { images } = defineProps<{
  images: ImageResult[]
}>()
</script>
