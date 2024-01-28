<template>
  <!-- <pre>{{ race }}</pre> -->
  <div v-if="race" class="flex flex-col items-center justify-center">
    <NewRaceState v-if="race.status === RACE_NO_STARTED" />

    <CompletedRaceState v-if="race.status === RACE_COMPLETED" />

    <Loader2 v-if="isLoading" class="text-primary h-20 w-20 animate-spin" />

    <template v-if="race.status === RACE_STARTED">
      <SearchForm />
      <ResultContainer v-if="searchResult?.length" :result="searchResult" />
    </template>
  </div>

  <teleport v-if="isMounted && race && race.status !== RACE_NO_STARTED" to="#header-action"
    ><Scoreboard />
  </teleport>
</template>
<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
import { ResultContainer, SearchForm } from '@/components/search-result'
import { NewRaceState, CompletedRaceState, Scoreboard } from '@/components/race'
import { useSearch, useRace } from '@/lib/composables'
import { onBeforeMount } from 'vue'
import { RACE_COMPLETED, RACE_NO_STARTED, RACE_STARTED } from '@/lib/constants'
import { useMounted } from '@vueuse/core'

const { searchResult, isLoading } = useSearch()

const { race, fetchSellers, resetRaceState } = useRace()

const isMounted = useMounted()

onBeforeMount(async () => {
  resetRaceState()
  await fetchSellers()
})
</script>
