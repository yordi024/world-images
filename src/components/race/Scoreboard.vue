<template>
  <Dialog>
    <DialogTrigger as-child><Button variant="default">Scoreboard</Button></DialogTrigger>
    <DialogContent class="">
      <DialogHeader>
        <DialogTitle>Race Scoreboard</DialogTitle>
        <DialogDescription> A seller needs 20 points to win the race. </DialogDescription>
      </DialogHeader>
      <ul class="block divide-y-4 divide-gray-200 h-22 overflow-hidden">
        <li v-for="(score, key) in sellerScoreboard" :key="key" class="flex items-center my-2">
          <template v-if="score.points && key + 1 <= 3">
            <Medal1 class="w-8 h-8 mr-5" v-if="key + 1 === 1" />
            <Medal2 class="w-8 h-8 mr-5" v-else-if="key + 1 === 2" />
            <Medal3 class="w-8 h-8 mr-5" v-else-if="key + 1 === 3" />
          </template>
          <span v-else class="text-xl font-bold w-[50px]">{{ key + 1 }}.</span>
          <div class="flex-1 w-full">
            <h3 class="text-lg font-medium">{{ score.seller.name }}</h3>
            <span class="font-medium text-primary">{{ score.points }} points</span>
          </div>
          <Progress class="w-20" :modelValue="(score.points * 100) / RACE_LIMIT_POINTS" />
        </li>
      </ul>
    </DialogContent>
  </Dialog>
</template>
<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useRace } from '@/lib/composables'
import { RACE_LIMIT_POINTS } from '@/lib/constants'
import { Medal1, Medal2, Medal3 } from '@/components/icons'

const { sellerScoreboard } = useRace()
</script>
