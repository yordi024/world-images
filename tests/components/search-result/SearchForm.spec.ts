import { setActivePinia, createPinia } from 'pinia'
import { VueWrapper, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import SearchForm from '@/components/search-result/SearchForm.vue'
import { useRaceStore } from '@/stores/race.store'
import { useSearch } from '@/lib/composables'
import HttpClient from '@/lib/wrappers/pixabay.wrapper'
import { dummyImagesResult, dummySellers } from '../../helpers'

describe('SearchForm', () => {
  let wrapper: VueWrapper
  beforeEach(() => {
    setActivePinia(createPinia())

    vi.spyOn(HttpClient, 'get').mockReturnValue({
      data: {
        hits: dummyImagesResult,
      },
    })

    const raceStore = useRaceStore()
    raceStore.sellers = [...dummySellers]

    wrapper = mount(SearchForm, {})
  })

  it('should render', () => {
    expect(wrapper.exists()).toBeTruthy()

    expect(wrapper.find('label').text()).toContain('Search')

    expect(wrapper.find('input[id="default-search"]').exists()).toBeTruthy()

    expect(wrapper.find('button').exists()).toBeTruthy()
  })

  it('should search', async () => {
    const { searchInput, searchResult } = useSearch()
    await wrapper.find('input[id="default-search"]').setValue('dog')

    await wrapper.find('form').trigger('submit')

    expect(searchInput.value).toBe('dog')
    for (const [index, result] of searchResult.value.entries()) {
      const seller = dummySellers.find((seller) => seller.id === result.seller.id)
      expect(seller).toBeTruthy()
      expect(result.image).toStrictEqual(dummyImagesResult[index])
    }
  })

  it('should display no result label on empty response', async () => {
    vi.spyOn(HttpClient, 'get').mockReturnValue({
      data: {
        hits: [],
      },
    })

    await wrapper.find('form').trigger('submit')

    expect(wrapper.find('p').text()).toContain("There's no results for this search")
  })
})
