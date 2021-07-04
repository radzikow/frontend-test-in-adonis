import axios from 'axios'

export const submit = (form, state) => {
  if (validationPassed(state)) {
    axios
      .post('/order', getFormData(form))
      .then(response => showFormMessage(form, response.data.message, 'success'))
      .catch(error => showFormMessage(form, error.response.data.message, 'error'))
  }
}

const validationPassed = state => {
  return Object.keys(state).length === 0 ? true : false
}

const showFormMessage = (form, message, status) => {
  let wrapper = form.querySelector('.message')
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
  }, 5000)
}

const getFormData = (form) => {
  let elements = [...form.querySelectorAll('.formElementData')]
  let data = {}

  elements.map(element => {
    let name = element.id
    let value = element.value.trim()

    if (name === 'phone') {
      value = value.replace(/[\s()-]/g, '')
    }

    if (name === 'credit_card') {
      name = 'creditCard'
      value = value.replace(/[\s-]/g, '')
    }

    if (name === 'expiration_date') {
      name = 'expDate'
      value = value.replaceAll(' ', '')
    }

    if (name === 'security_code') {
      name = 'CVV'
    }

    if (name === 'first_name') {
      name = 'firstName'
    }

    if (name === 'last_name') {
      name = 'lastName'
    }

    if (name === 'postal_code') {
      name = 'postalCode'
    }

    data = { ...data, [name]: value}
  })

  return data
}

const clearForm = (form) => {
  let elements = [...form.querySelectorAll('.formElementData')]
  elements.map(element => {
    element.value = ''
  })
}
