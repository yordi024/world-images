import { setActivePinia, createPinia } from 'pinia'
import { DOMWrapper, VueWrapper, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import Scoreboard from '@/components/race/Scoreboard.vue'
import { useRaceStore } from '@/stores/race.store'
import { DialogContent, DialogTitle } from '@/components/ui/dialog'
import { dummySellers, dummyScoreboard } from '../../helpers'

describe('Scoreboard', () => {
  let wrapper: VueWrapper<InstanceType<typeof Scoreboard>>
  let trigger: DOMWrapper<HTMLElement>
  let dialog

  beforeEach(async () => {
    setActivePinia(createPinia())

    document.body.innerHTML = ''
    wrapper = mount(Scoreboard, {
      attachTo: document.body,
    })
    trigger = wrapper.find('button')
    dialog = wrapper.getComponent(DialogContent)
  })

  it('should render', async () => {
    await trigger.element.dispatchEvent(new Event('click'))
    expect(wrapper.exists()).toBeTruthy()
    expect(dialog.getComponent(DialogTitle).text()).toContain('Race Scoreboard')
  })

  it('should list sellers with score', async () => {
    await trigger.element.dispatchEvent(new Event('click'))

    const store = useRaceStore()
    store.sellers = dummySellers
    store.race.scoreboard = dummyScoreboard

    await wrapper.vm.$nextTick()
    const sellerScoreList = document.body.getElementsByTagName('li')

    for (const [index, seller] of store.sellers.entries()) {
      const liItem = sellerScoreList.item(index)
      expect(liItem?.innerHTML).toContain(seller.name)
      expect(liItem?.innerHTML).toContain(`${store.race.scoreboard[seller.id]} points`)
    }
  })
})
