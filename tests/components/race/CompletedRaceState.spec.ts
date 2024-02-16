import { setActivePinia, createPinia } from 'pinia'
import { VueWrapper, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import CompletedRaceState from '@/components/race/CompletedRaceState.vue'
import { useRace } from '@/lib/composables'
import { useRaceStore } from '@/stores/race.store'
import { RaceApiService } from '@/lib/api/race.service'
import { RACE_COMPLETED, RACE_NO_STARTED } from '@/lib/constants'
import { dummyInvoice, dummySellers } from '../../helpers'

describe('CompletedRaceState', () => {
  let wrapper: VueWrapper
  let raceStore

  beforeEach(() => {
    setActivePinia(createPinia())

    vi.spyOn(RaceApiService.prototype, 'createInvoice').mockReturnValue(dummyInvoice)

    raceStore = useRaceStore()

    raceStore.sellers = [...dummySellers]
    raceStore.startRace()
    raceStore.addPoints(1, 10)
    raceStore.finishRace()

    wrapper = mount(CompletedRaceState, {})
  })

  it('should render', () => {
    expect(wrapper.exists()).toBeTruthy()

    expect(wrapper.find('h3').text()).toContain('World Images Race')
  })

  it('should display the winner name and score', async () => {
    const { firstPlaceScore } = useRace()

    const winnerHeader = wrapper.findAll('h3').at(-1)

    expect(winnerHeader?.text()).toContain(firstPlaceScore.value.seller.name)

    expect(wrapper.find('span.text-primary').text()).toContain(
      firstPlaceScore.value.totalPoints + ' points',
    )
  })

  it('should generate the prize', async () => {
    const { prize } = useRace()
    expect((wrapper.vm as any).isInvoiceGenerated).toBeFalsy()

    const button = wrapper.findComponent('Button')
    await button.element.dispatchEvent(new Event('click'))

    expect((wrapper.vm as any).isInvoiceGenerated).toBeTruthy()
    expect(prize.value.total).toBe(100)
  })

  it('should restart the race from component', async () => {
    const { handleAwardPrize, race } = useRace()
    await handleAwardPrize()
    expect(race.value.status).toBe(RACE_COMPLETED)

    const button = wrapper.findComponent('Button')
    await button.element.dispatchEvent(new Event('click'))
    expect(race.value.status).toBe(RACE_NO_STARTED)
  })
})
