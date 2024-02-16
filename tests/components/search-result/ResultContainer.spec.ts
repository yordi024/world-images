import { setActivePinia, createPinia } from 'pinia'
import { VueWrapper, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ResultContainer from '@/components/search-result/ResultContainer.vue'
import ImageItem from '@/components/search-result/ImageItem.vue'
import { useRaceStore } from '@/stores/race.store'
import { useSearch } from '@/lib/composables'
import HttpClient from '@/lib/wrappers/pixabay.wrapper'
import { dummyImagesResult, dummySellers } from '../../helpers'

async function getSearhResult() {
  const { searchInput, searchResult, handleSearch } = useSearch()
  searchInput.value = 'dog'
  await handleSearch()
  return searchResult
}

describe('ResultContainer', async () => {
  let wrapper: VueWrapper
  let raceStore
  let searchResult

  beforeEach(async () => {
    setActivePinia(createPinia())

    vi.spyOn(HttpClient, 'get').mockReturnValue({
      data: {
        hits: dummyImagesResult,
      },
    })

    raceStore = useRaceStore()
    raceStore.sellers = [...dummySellers]
    raceStore.startRace()

    searchResult = await getSearhResult()

    wrapper = mount(ResultContainer, {
      props: {
        result: searchResult.value,
      },
    })
  })

  it('should render all image items', () => {
    expect(wrapper.exists()).toBeTruthy()

    expect(wrapper.findAllComponents(ImageItem).length).toBe(searchResult.value.length)
  })
})
