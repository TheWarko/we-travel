import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Button from './Button.vue'

describe('Button.vue', () => {
  it('renders default theme class', () => {
    const wrapper = mount(Button)
    expect(wrapper.classes()).toContain('themeTravel')
  })

  it('renders slot content', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me'
      }
    })
    expect(wrapper.text()).toBe('Click me')
  })

  it('applies the correct theme class when prop is passed', () => {
    const wrapper = mount(Button, {
      props: {
        theme: 'themeBooking'
      }
    })
    expect(wrapper.classes()).toContain('themeBooking')
  })
})