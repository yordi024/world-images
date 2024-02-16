import { VueWrapper, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import LoadingSkeletonState from '@/components/search-result/LoadingSkeletonState.vue'

describe('LoadingSkeletonState', () => {
  let wrapper: VueWrapper
  beforeEach(() => {
    wrapper = mount(LoadingSkeletonState, {})
  })

  it('should render', () => {
    expect(wrapper.exists()).toBeTruthy()

    expect(wrapper.findAll('.animate-pulse').length).toBe(12)
  })
})
