import { ref } from 'vue'
import type { ImageResult, SellerImage } from '../types'
import HttpClient from '../wrappers/pixabay.wrapper'
import { useRaceStore } from '@/stores/race.store'
import { storeToRefs } from 'pinia'

const searchInput = ref('')

const searchResult = ref<SellerImage[]>()

const isLoading = ref<boolean | undefined>()

export const useSearch = function () {
  const raceStore = useRaceStore()

  const { sellers } = storeToRefs(raceStore)

  const noResults = ref(false)

  async function handleSearch() {
    isLoading.value = true
    noResults.value = false
    searchResult.value = []

    let query = `/?key=${import.meta.env.VITE_PIXABAY_API_KEY}&safesearch=true`
    query += searchInput.value ? `&q=${searchInput.value}` : ''
    query += '&per_page=' + Math.max(sellers.value.length, 3)

    try {
      const respone = await HttpClient.get(query)

      if (!respone.data.hits.length) {
        noResults.value = true
        return
      }

      for (const [index, seller] of sellers.value.entries()) {
        const image = respone.data.hits[index] as ImageResult

        if (image) {
          searchResult.value?.push({
            seller,
            image: image,
          })
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }

  function clearResult() {
    setTimeout(() => {
      searchInput.value = ''
      searchResult.value = []
    }, 200)
  }

  return {
    searchInput,
    searchResult,
    isLoading,
    noResults,
    handleSearch,
    clearResult,
  }
}
