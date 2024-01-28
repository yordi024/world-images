<template>
  <div class="group rounded-md relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
    <img
      class="h-auto max-w-full transition duration-300 ease-in-out hover:scale-110"
      :src="resultItem.image.webformatURL"
      :alt="resultItem.image.tags"
    />
    <div
      class="flex flex-col p-3 justify-between items-end absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20"
    >
      <Button size="icon" variant="ghost" @click="handleFavoriteImage(resultItem.seller)"
        ><Heart
      /></Button>
      <div class="w-full">
        <h3 class="text-3xl font-bold text-white">{{ resultItem.seller.name }}</h3>
        <div class="overflow-hidden text-sm leading-6">Seller</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Heart } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import type { SellerImage } from '@/lib/types'
import { useRace } from '@/lib/composables'

const { resultItem } = defineProps<{
  resultItem: SellerImage
}>()

const { handleFavoriteImage } = useRace()
</script>
