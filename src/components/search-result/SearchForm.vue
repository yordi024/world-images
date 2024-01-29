<template>
  <Globe2 class="text-primary h-20 w-20 mb-5" />
  <form class="w-full max-w-3xl mb-3" @submit.prevent="handleSearch">
    <label for="default-search" class="mb-2 text-sm font-medium sr-only">Search</label>
    <div class="relative">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <Search />
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
  <p v-if="searchResult?.length" class="text-muted-foreground text-lg mb-10">
    Select an image to give the participant {{ RACE_LIKE_POINTS }} points, with a maximum of
    {{ RACE_LIMIT_POINTS }} points to win.
  </p>
  <p v-if="noResults" class="text-muted-foreground text-lg mb-10">
    There's no results for this search
  </p>
</template>
<script setup lang="ts">
import { useSearch } from '@/lib/composables'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Globe2, Search } from 'lucide-vue-next'
import { RACE_LIKE_POINTS, RACE_LIMIT_POINTS } from '@/lib/constants'

const { searchInput, isLoading, noResults, handleSearch, searchResult } = useSearch()
</script>
