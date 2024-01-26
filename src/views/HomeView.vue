<template>
  <div class="flex flex-col items-center justify-center">
    <Globe2 class="text-primary h-20 w-20 mb-5" />

    <form class="w-full max-w-3xl mb-10" @submit.prevent="handleSubmit">
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
    <ResultContainer v-if="searchResult?.length" :images="searchResult" />
  </div>
</template>
<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Globe2, Loader2 } from 'lucide-vue-next'
import HttpClient from '@/lib/wrappers/pixabay.wrapper'
import { ResultContainer } from '@/components/search-result'
import type { ImageResult } from '@/lib/types'
import { ref } from 'vue'

const searchInput = ref('')

const searchResult = ref<ImageResult[]>()

const isLoading = ref<boolean | undefined>()

async function handleSubmit() {
  isLoading.value = true

  let query = `/?key=${import.meta.env.VITE_PIXABAY_API_KEY}`
  query += searchInput.value ? `&q=${searchInput.value}` : ''

  try {
    const respone = await HttpClient.get(query)
    searchResult.value = respone.data.hits
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}
</script>
