import { getMessage } from './messages'
import { required, string, email, number, phone, date, card } from './validators'
import FormState from './FormState'

export default class FormValidator {
  constructor (form, fields, messages) {
    this.form = form
    this.fields = fields
    this.messages = messages
    this.state = new FormState()
  }

  initialize () {
    this.validateOnSubmit()
    this.validateOnEntry()
  }

  validateOnSubmit () {
    this.form.addEventListener('submit', e => {
      e.preventDefault()
      this.fields.forEach(field => {
        const input = this.form.querySelector(`#${field.name}`)
        this.validateField(field, input)
      })
    })
  }

  validateOnEntry () {
    this.fields.forEach(field => {
      if (field.rules && field.rules.length > 0) {
        const input = document.querySelector(`#${field.name}`)
        input.addEventListener('input', () => {
          this.validateField(field, input)
        })
      }
    })
  }

  validateField (field, input) {
    if (field.name === input.name) {
      let isValid = true
      let rule = 'required'

      // Mind the order for validation messages priority
      if (isValid && field.rules.includes('required')) {
        rule = 'required'
        isValid = required(input.value)
      }

      if (isValid && field.rules.includes('string')) {
        rule = 'string'
        isValid = string(input.value)
      }

      if (isValid && field.rules.includes('email')) {
        rule = 'email'
        isValid = email(input.value)
      }

      if (isValid && field.rules.includes('number')) {
        rule = 'number'
        isValid = number(input.value)
      }

      if (isValid && field.rules.includes('phone')) {
        rule = 'phone'
        isValid = phone(input.value)
      }

      if (isValid && field.rules.includes('date')) {
        rule = 'date'
        isValid = date(input.value)
      }

      if (isValid && field.rules.includes('card')) {
        rule = 'card'
        isValid = card(input.value)
      }

      // Set status in the state of the form validation
      if (!isValid) {
        let message = getMessage(field.name, rule, this.messages)
        this.setStatus(field.name, 'error', message)
      }

      if (isValid) {
        this.setStatus(field.name, 'success')
      }
    }
  }

  setStatus (name, status, message = '') {
    if (status === 'error') {
      this.state.setField({
        [name]: {
          status: status,
          message: message,
        },
      })
    }

    if (status === 'success') {
      this.state.deleteField(name)
    }

    console.log(this.state._state) // test
  }
}
