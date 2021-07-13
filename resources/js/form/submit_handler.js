import axios from 'axios'
import regeneratorRuntime from 'regenerator-runtime'

export const submit = async (form, state) => {
  if (validationPassed(state)) {
    try {
      const response = await axios.post('/order', getFormData(form))
      showFormMessage(form, response.data.message, 'success')
    } catch (error) {
      showFormMessage(form, error.response.data.message, 'error')
    }
  }
}

const validationPassed = state => {
  return Object.keys(state).length === 0 ? true : false
}

const showFormMessage = (form, message, status) => {
  const wrapper = form.querySelector('.message')
  wrapper.innerHTML = message

  if (status === 'success') {
    wrapper.classList.add('message--success')
  }

  if (status === 'error') {
    wrapper.classList.add('message--error')
  }

  setTimeout(() => {
    clearForm(form)
    wrapper.classList.remove('message--success', 'message--error')
  }, 8000)
}

const getFormData = (form) => {
  const formData = new FormData(form)

  if (formData.has('first_name')) {
    const value = formData.get('first_name')
    formData.set('firstName', value)
    formData.delete('first_name')
  }

  if (formData.has('last_name')) {
    const value = formData.get('last_name')
    formData.set('lastName', value)
    formData.delete('last_name')
  }

  if (formData.has('security_code')) {
    const value = formData.get('security_code')
    formData.set('CVV', value)
    formData.delete('security_code')
  }

  if (formData.has('credit_card')) {
    let value = formData.get('credit_card')
    formData.set('creditCard', value.replace(/[\s-]/g, ''))
    formData.delete('credit_card')
  }

  if (formData.has('phone')) {
    let value = formData.get('phone')
    formData.set('phone', value.replace(/[\s()-]/g, ''))
  }

  if (formData.has('expiration_date')) {
    let value = formData.get('expiration_date')
    formData.set('expDate', value.replaceAll(' ', ''))
    formData.delete('expiration_date')
  }

  if (formData.has('postal_code')) {
    const value = formData.get('postal_code')
    formData.set('postalCode', value)
    formData.delete('postal_code')
  }

  return formData
}

const clearForm = (form) => {
  let elements = [...form.querySelectorAll('.formElementData')]
  elements.map(element => {
    element.value = ''
  })
}
