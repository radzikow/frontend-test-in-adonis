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
    let validationFunctions = [required, string, email, number, phone, date, card]

    if (field.name === input.name) {
      let passed = true
      let currentRule = ''

      field.rules.forEach(rule => {
        if (passed && field.rules.includes(rule)) {
          currentRule = rule
          validationFunctions.forEach(f => {
            if (f.name === rule) {
              passed = f(input.value)
            }
          })
        }
      })

      // Set status in the state of the form validation
      if (!passed) {
        let message = getMessage(field.name, currentRule, this.messages)
        this.setStatus(field.name, 'error', message)
      }

      if (passed) {
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
