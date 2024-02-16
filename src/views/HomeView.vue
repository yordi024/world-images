<template>
  <div v-if="race" class="flex flex-col items-center justify-center">
    <NewRaceState v-if="race.status === RACE_NO_STARTED" />

    <CompletedRaceState v-if="race.status === RACE_COMPLETED" />

    <template v-if="race.status === RACE_STARTED">
      <SearchForm />
      <LoadingSkeletonState class="mt-12" v-if="isLoading" />

      <ResultContainer :result="searchResult" />
    </template>
  </div>

  <teleport v-if="isMounted && race && race.status !== RACE_NO_STARTED" to="#header-action"
    ><Scoreboard />
  </teleport>
</template>
<script setup lang="ts">
import { ResultContainer, SearchForm, LoadingSkeletonState } from '@/components/search-result'
import { NewRaceState, CompletedRaceState, Scoreboard } from '@/components/race'
import { useSearch, useRace } from '@/lib/composables'
import { onBeforeMount } from 'vue'
import { RACE_COMPLETED, RACE_NO_STARTED, RACE_STARTED } from '@/lib/constants'
import { useMounted } from '@vueuse/core'

const { searchResult, isLoading } = useSearch()

const { race, fetchSellers } = useRace()

const isMounted = useMounted()

onBeforeMount(async () => {
  await fetchSellers()
})
</script>
