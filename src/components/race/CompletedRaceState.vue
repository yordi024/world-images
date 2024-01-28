<template>
  <div class="m-24 w-full max-w-3xl mb-10 text-center">
    <Trophy class="inline-block text-primary h-24 w-24" />
    <h3 class="text-2xl mb-2">World Images Race</h3>
    <p class="text-muted-foreground text-lg mb-5">
      The awesome Race has finish, give the winer the big prize!
    </p>
    <div class="flex items-center justify-center mb-5 text-2xl space-x-3 font-medium">
      <Medal1 class="h-8 w-8" />
      <h3 class="">{{ firstPlaceScore?.seller?.name }}</h3>
      <span class="text-primary">{{ firstPlaceScore?.totalPoints }} points</span>
    </div>
    <!-- <Button @click="handleAwardPrize"> Award the prize </Button> -->
    <div class="space-x-3">
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
import { ref } from 'vue'

const showPrice = ref(false)

const { firstPlaceScore, resetRaceState, handleAwardPrize } = useRace()
</script>
