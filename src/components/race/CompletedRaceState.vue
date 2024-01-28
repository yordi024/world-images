<template>
  <div class="mt-24 w-full max-w-3xl text-center">
    <Trophy class="inline-block text-primary h-24 w-24" />
    <h3 class="text-2xl mb-2">World Images Race</h3>
    <p class="text-muted-foreground text-lg mb-5">
      The amazing race is over, give the winner the grand prize!
    </p>
    <div class="flex items-center justify-center mb-5 text-2xl space-x-3 font-medium">
      <Medal1 class="h-8 w-8" />
      <h3 class="">{{ firstPlaceScore?.seller?.name }}</h3>
      <span class="text-primary">{{ firstPlaceScore?.totalPoints }} points</span>
    </div>
    <Button v-if="!isInvoiceGenerated" @click="handleAwardPrize" :disabled="generatingInvoice">
      <Loader2 v-if="generatingInvoice" class="mr-2 animate-spin" />
      Generate the prize
    </Button>
    <div v-else class="space-x-3">
      <Button @click="resetRaceState" variant="secondary"> Start Over </Button>
      <Button @click="showPrice = true"> See Prize </Button>
    </div>
  </div>

  <PrizeModal v-model:open="showPrice" />
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useRace } from '@/lib/composables'
import { Medal1, Trophy } from '@/components/icons'
import PrizeModal from './PrizeModal.vue'
import { Loader2 } from 'lucide-vue-next'
import { computed, ref } from 'vue'

const showPrice = ref(false)

const { prize, firstPlaceScore, generatingInvoice, resetRaceState, handleAwardPrize } = useRace()

const isInvoiceGenerated = computed(() => {
  return Object.values(prize.value).length
})
</script>
