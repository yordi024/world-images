import { setActivePinia, createPinia } from 'pinia'
import { VueWrapper, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import NewRaceState from '@/components/race/NewRaceState.vue'
import { useRace } from '@/lib/composables'
import { RACE_STARTED, RACE_NO_STARTED } from '@/lib/constants'

describe('NewRaceState', () => {
  let wrapper: VueWrapper
  beforeEach(() => {
    setActivePinia(createPinia())
    wrapper = mount(NewRaceState, {})
  })

  it('should render', () => {
    expect(wrapper.exists()).toBeTruthy()

    expect(wrapper.find('h3').text()).toContain('World Images Race')
  })

  it('should display rules', () => {
    expect(wrapper.find('h4').text()).toContain('Rules')

    const rules = wrapper.vm?.rules as any
    const rulesList = wrapper.findAll('li')

    for (const [index, item] of rulesList.entries()) {
      expect(item.text()).toContain(rules[index])
    }
  })

  it('can start the race from component', async () => {
    const { race } = useRace()
    expect(race.value.status).toBe(RACE_NO_STARTED)

    const button = wrapper.findComponent('Button')
    await button.element.dispatchEvent(new Event('click'))

    expect(race.value.status).toBe(RACE_STARTED)
  })
})
