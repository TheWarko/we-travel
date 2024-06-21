import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ErrorMessage from './ErrorMessage.vue'

describe('ErrorMessage.vue', () => {
  it('renders error message when error prop is passed', () => {
    const error = new Error('Test error')
    const wrapper = mount(ErrorMessage, {
      props: {
        error
      }
    })
    expect(wrapper.text()).toContain('Error: An unexpected error occurred. Please try again later.')
  })

  it('does not render error message when error prop is null', () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        error: null
      }
    })
    expect(wrapper.find('.error-message').exists()).toBe(false)
  })

  it('has the correct class applied', () => {
    const error = new Error('Test error')
    const wrapper = mount(ErrorMessage, {
      props: {
        error
      }
    })
    expect(wrapper.classes()).toContain('error-message')
  })
})