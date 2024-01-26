<template>
  <div
    class="w-full flex border-primary/50 text-primary dark:border-primary items-center justify-between max-w-3xl rounded-lg p-4 border"
  >
    <Medal class="mr-2" />
    <div class="text-2xl font-bold flex-1">Juan Perez</div>
    <Button>Scoreboard</Button>
  </div>
</template>
<script setup lang="ts">
import { Medal } from 'lucide-vue-next'
</script>
