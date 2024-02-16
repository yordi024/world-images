import { setActivePinia, createPinia } from 'pinia'
import { VueWrapper, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
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

describe('ImageItem', async () => {
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

    wrapper = mount(ImageItem, {
      props: {
        resultItem: searchResult.value[0],
      },
    })
  })

  it('should render', () => {
    expect(wrapper.exists()).toBeTruthy()

    expect(wrapper.find('img').html()).toContain(searchResult.value[0].image.webformatURL)
    expect(wrapper.find('img').html()).toContain(searchResult.value[0].image.tags)
    expect(wrapper.find('h3').html()).toContain(searchResult.value[0].seller.name)

    expect(wrapper.find('button').exists()).toBeTruthy()
  })

  it('should be likeable', async () => {
    expect(raceStore.race.totalPoints).toBe(0)

    await wrapper.find('button').trigger('click')

    expect(raceStore.race.totalPoints).toBe(3)
    expect(raceStore.race.scoreboard['1']).toBe(3)

    await wrapper.find('button').trigger('click')

    expect(raceStore.race.totalPoints).toBe(6)
    expect(raceStore.race.scoreboard['1']).toBe(6)
  })
})
