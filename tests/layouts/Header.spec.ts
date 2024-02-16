import { setActivePinia, createPinia } from 'pinia'
import { VueWrapper, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import Header from '@/layouts/Header.vue'
import { useDark } from '@vueuse/core/index.cjs'

describe('Header', () => {
  let wrapper: VueWrapper
  beforeEach(() => {
    setActivePinia(createPinia())

    wrapper = mount(Header, {
      global: {
        stubs: ['RouterLink'],
      },
    })
  })

  it('should render', () => {
    expect(wrapper.exists()).toBeTruthy()

    expect(wrapper.text()).toContain('Admin')

    expect(wrapper.find('button').exists()).toBeTruthy()
  })

  it('can toggle theme', async () => {
    const isDark = useDark()

    expect(isDark.value).toBeFalsy()

    await wrapper.find('button').trigger('click')

    expect(isDark.value).toBeTruthy()

    await wrapper.find('button').trigger('click')

    expect(isDark.value).toBeFalsy()
  })
})
