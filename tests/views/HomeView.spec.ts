import { setActivePinia, createPinia } from 'pinia'
import { VueWrapper, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import HomeView from '@/views/HomeView.vue'
import { NewRaceState, CompletedRaceState } from '@/components/race'
import { useRaceStore } from '@/stores/race.store'
import { dummySellers } from '../helpers'

describe('HomeView', () => {
  let wrapper: VueWrapper
  let raceStore

  beforeEach(() => {
    setActivePinia(createPinia())

    raceStore = useRaceStore()
    raceStore.sellers = [...dummySellers]

    wrapper = mount(HomeView, {
      global: {
        stubs: {
          teleport: { template: '<div />' },
        },
      },
    })
  })

  it('should render', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('should show new race state', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.findComponent(NewRaceState).exists()).toBeTruthy()
  })

  it('should show started race state', async () => {
    await raceStore.startRace()

    expect(wrapper.findComponent(NewRaceState).exists()).toBeFalsy()
    expect(wrapper.find('form').exists()).toBeTruthy()
  })

  it('should show completed state', async () => {
    raceStore.startRace()
    raceStore.addPoints(1, 10)
    await raceStore.finishRace()

    expect(wrapper.findComponent(NewRaceState).exists()).toBeFalsy()
    expect(wrapper.findComponent(CompletedRaceState).exists()).toBeTruthy()
  })
})
