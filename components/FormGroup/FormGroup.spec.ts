import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import FormGroup from './FormGroup.vue'

describe('FormGroup.vue', () => {
  it('renders label and slot content correctly', () => {
    const wrapper = mount(FormGroup, {
      props: {
        for: 'input-id',
        label: 'Test Label',
      },
      slots: {
        default: '<input id="input-id" />',
      }
    })
    expect(wrapper.find('label').text()).toBe('Test Label')
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('renders error message when error prop is passed', () => {
    const wrapper = mount(FormGroup, {
      props: {
        for: 'input-id',
        label: 'Test Label',
        error: 'This is an error message'
      }
    })
    expect(wrapper.find('.text-red-500').text()).toBe('This is an error message')
  })

  it('does not render error message when error prop is empty', () => {
    const wrapper = mount(FormGroup, {
      props: {
        for: 'input-id',
        label: 'Test Label',
        error: ''
      }
    })
    expect(wrapper.find('.text-red-500').exists()).toBe(false)
  })

  it('has the correct classes applied', () => {
    const wrapper = mount(FormGroup, {
      props: {
        for: 'input-id',
        label: 'Test Label',
      }
    })
    expect(wrapper.find('.form-group').exists()).toBe(true)
    expect(wrapper.find('.label').exists()).toBe(true)
  })
})