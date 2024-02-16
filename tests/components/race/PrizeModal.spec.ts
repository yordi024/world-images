import { setActivePinia, createPinia } from 'pinia'
import { VueWrapper, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import PrizeModal from '@/components/race/PrizeModal.vue'
import { DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { RaceApiService } from '@/lib/api/race.service'
import { useRaceStore } from '@/stores/race.store'
import { useRace } from '@/lib/composables'
import { dummyInvoice, dummySellers } from '../../helpers'

describe('PrizeModal', () => {
  let wrapper: VueWrapper<InstanceType<typeof PrizeModal>>
  let dialog

  beforeEach(async () => {
    setActivePinia(createPinia())
    vi.spyOn(RaceApiService.prototype, 'createInvoice').mockReturnValue(dummyInvoice)

    const raceStore = useRaceStore()
    raceStore.sellers = [...dummySellers]
    raceStore.startRace()
    raceStore.addPoints(1, 10)
    raceStore.finishRace()
    await raceStore.generaTePrize(raceStore.sellers[0].id)

    document.body.innerHTML = ''
    wrapper = mount(PrizeModal, {
      props: {
        open: false,
      },
      attachTo: document.body,
    })
    dialog = wrapper.getComponent(DialogContent)
  })

  it('should render', async () => {
    await wrapper.setProps({ open: true })

    expect(wrapper.exists()).toBeTruthy()
    expect(dialog.getComponent(DialogTitle).text()).toContain('Alegra Invoice')
    expect(dialog.getComponent(DialogDescription).text()).toContain('The prize of the winner.')
    expect(document.body.innerHTML).toContain('Thank you for your participation!')
  })

  it('should display invoice detail', async () => {
    await wrapper.setProps({ open: true })

    const { prize } = useRace()
    expect((wrapper.vm as any).totalItem).toBe(10)
    expect(document.body.innerHTML).toContain(`Date: ${prize.value.date}`)
    expect(document.body.innerHTML).toContain(
      `Invoice #: ${prize.value.numberTemplate.formattedNumber}`,
    )
    expect(document.body.innerHTML).toContain(prize.value.seller.name)
    expect(document.body.innerHTML).toContain(prize.value.client.name)
    expect(document.body.innerHTML).toContain(prize.value.total)

    for (const item of prize.value.items) {
      expect(document.body.innerHTML).toContain(item.name)
      expect(document.body.innerHTML).toContain(item.quantity)
      expect(document.body.innerHTML).toContain(item.total)
    }
  })
})
