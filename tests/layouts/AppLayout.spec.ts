import { setActivePinia, createPinia } from 'pinia'
import { VueWrapper, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import AppLayout from '@/layouts/AppLayout.vue'

describe('AppLayout', () => {
  let wrapper: VueWrapper
  beforeEach(() => {
    setActivePinia(createPinia())

    wrapper = mount(AppLayout, {
      global: {
        stubs: ['Header', 'RouterView'],
      },
    })
  })

  it('should render', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
})
