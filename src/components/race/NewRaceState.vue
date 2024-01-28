<template>
  <Globe2 class="mt-24 text-primary h-20 w-20 mb-5" />
  <div class="w-full max-w-3xl mb-10 text-center">
    <h3 class="text-2xl mb-2">World Images Race</h3>
    <p class="text-muted-foreground text-lg mb-5">
      Discover the beauty of the world and take part in the Alegra grand prize race for world images
      by searching and selecting your favorite pictures.
    </p>
    <Button :disabled="!sellers.length" @click="startRace"> Start Race </Button>
  </div>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useRace } from '@/lib/composables'
import { Globe2 } from 'lucide-vue-next'

const { sellers, startRace } = useRace()
</script>
