<template>
  <Dialog>
    <DialogTrigger as-child> <Button variant="primary">Scoreboard</Button></DialogTrigger>
    <DialogContent class="">
      <DialogHeader>
        <DialogTitle>Race Scoreboard</DialogTitle>
        <DialogDescription> A seller needs 20 points to win the race. </DialogDescription>
      </DialogHeader>
      <ul class="block divide-y-4 divide-gray-200 h-22 overflow-hidden">
        <li v-for="(score, key) in scoreBoard" :key="key" class="flex items-center my-2">
          <span class="text-xl font-bold mr-4">{{ key + 1 }}.</span>
          <div class="flex-1 w-full">
            <h3 class="text-lg font-medium">{{ score.seller.name }}</h3>
            <!-- <p class="text-primary">
              <span class="font-semibold">{{ score.points }}</span
              >/20
            </p> -->
          </div>
          <Progress class="w-20" :modelValue="(score.points * 100) / 20" />
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
import { ref } from 'vue'

const scoreBoard = ref([
  {
    seller: {
      id: 1,
      name: 'Juan Perez',
    },
    points: 15,
  },
  {
    seller: {
      id: 1,
      name: 'Juan Perez',
    },
    points: 10,
  },
  {
    seller: {
      id: 1,
      name: 'Juan Perez',
    },
    points: 10,
  },
  {
    seller: {
      id: 1,
      name: 'Juan Perez',
    },
    points: 10,
  },
  {
    seller: {
      id: 1,
      name: 'Juan Perez',
    },
    points: 10,
  },
  {
    seller: {
      id: 1,
      name: 'Juan Perez',
    },
    points: 10,
  },
  {
    seller: {
      id: 1,
      name: 'Juan Perez',
    },
    points: 10,
  },
  {
    seller: {
      id: 1,
      name: 'Juan Perez',
    },
    points: 10,
  },
  {
    seller: {
      id: 1,
      name: 'Juan Perez',
    },
    points: 10,
  },
])
</script>
