<template>
  <pre>{{ race }}</pre>
  <div class="flex flex-col items-center justify-center">
    <Globe2 class="text-primary h-20 w-20 mb-5" />

    <div v-if="race?.status === RACE_NO_STARTED" class="w-full max-w-3xl mb-10 text-center">
      <h3 class="text-2xl mb-2">World Images Race</h3>
      <p class="text-muted-foreground text-lg mb-5">
        Start the world images race and participate in the competition for the Alegra grand prize.
      </p>
      <Button @click="startRace"> Start Race </Button>
    </div>

    <form v-else class="w-full max-w-3xl mb-10" @submit.prevent="handleSearch">
      <label for="default-search" class="mb-2 text-sm font-medium sr-only">Search</label>
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <Input
          v-model="searchInput"
          type="search"
          id="default-search"
          class="p-4 ps-10 text-sm h-14"
          autocomplete="off"
          placeholder="Search images..."
          required
        />
        <Button
          type="submit"
          :disabled="isLoading"
          class="absolute end-2.5 bottom-2 font-medium px-4 py-2"
        >
          Search
        </Button>
      </div>
    </form>

    <Loader2 v-if="isLoading" class="text-primary h-20 w-20 animate-spin" />
    <ResultContainer v-if="searchResult?.length" :result="searchResult" />
  </div>
</template>
<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Globe2, Loader2 } from 'lucide-vue-next'
import { ResultContainer } from '@/components/search-result'
import { useSearch, useRace } from '@/lib/composables'
import { RACE_NO_STARTED } from '@/lib/constants'
import { onBeforeMount } from 'vue'

const { searchInput, searchResult, isLoading, handleSearch } = useSearch()

const { race, startRace, fetchSellers } = useRace()

onBeforeMount(async () => {
  await fetchSellers()
})
</script>
