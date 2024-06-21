import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ButtonCancel from './ButtonCancel.vue'

describe('ButtonCancel.vue', () => {
  it('renders slot content', () => {
    const wrapper = mount(ButtonCancel, {
      slots: {
        default: 'Cancel'
      }
    })
    expect(wrapper.text()).toBe('Cancel')
  })

  it('has the correct class applied', () => {
    const wrapper = mount(ButtonCancel)
    expect(wrapper.classes()).toContain('btn-cancel')
  })
})