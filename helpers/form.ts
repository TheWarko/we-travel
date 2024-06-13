export const validateForm = (data: any, errors: any) => {
  let valid = true
  Object.keys(data.value).forEach(key => {
    if(key in errors.value){
    if (!data.value[key]) {
      errors.value[key] = `The field ${key} is required`
      valid = false
    } else {
      errors.value[key] = ''
    }}
  })
  return valid
}

export const isValidEmail = (email: string) : boolean => {
  const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
  return regexEmail.test(email)
}

export const isValidPhone = (phone: string) : boolean => {
  const regexPhone = /^[0-9+]*$/g
  return phone !== '' && regexPhone.test(phone)
}

export const isValidAge = (ageString: string): boolean => {
    const isNumberOnly = /^[0-9]{1,3}$/.test(ageString)
    return isNumberOnly
}
