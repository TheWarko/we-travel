export const validateForm = (data: any, errors: any) => {
  let valid = true
  Object.keys(data.value).forEach(key => {
    if (!data.value[key]) {
      errors.value[key] = `The field ${key} is required`
      valid = false
    } else {
      errors.value[key] = ''
    }
  })
  return valid
}