import { getMessage } from './messages'
import { required, string, email, number, phone, date, card, min, max } from './validators'
import FormState from './FormState'
import { submit } from './submit_handler'

export default class FormValidator {
  constructor (form, fields, messages) {
    this.form = form
    this.fields = fields
    this.messages = messages
    this.state = new FormState()
  }

  initialize () {
    this.validateFormFieldsOnSubmit()
    this.validateFormFieldsOnEntry()
  }

  validateFormFieldsOnSubmit () {
    if (this.form) {
      this.form.addEventListener('submit', e => {
        e.preventDefault()

        this.fields.forEach(field => {
          const input = this.form.querySelector(`#${field.name}`)
          this.validateFormField(field, input)
        })

        submit(this.form, this.state._state)
      })
    }
  }

  validateFormFieldsOnEntry () {
    if (this.form) {
      this.fields.forEach(field => {
        if (field.rules && field.rules.length > 0) {
          const input = document.querySelector(`#${field.name}`)
          input.addEventListener('input', () => {
            this.validateFormField(field, input)
          })
        }
      })
    }
  }

  validateFormField (field, input) {
    const validationFunctions = [required, string, email, number, phone, date, card, min, max]

    if (field.name === input.name) {
      let passed = true
      let currentRule = ''

      field.rules.forEach(rule => {
        if (passed && field.rules.includes(rule)) {
          validationFunctions.forEach(validationFunction => {
            // handle validation rules with parameter, like: min, max
            if (rule.includes('min') || rule.includes('max')) {
              const ruleSet = rule.split(':')

              if (validationFunction.name === ruleSet[0]) {
                currentRule = rule
                passed = validationFunction(input.value, ruleSet[1])
              }
            } else { // handle other rules
              if (validationFunction.name === rule) {
                currentRule = rule
                passed = validationFunction(input.value)
              }
            }
          })
        }
      })

      if (!passed) {
        const message = getMessage(field.name, currentRule, this.messages)
        this.setFieldStatus(field.name, 'error', message)
        this.insertFieldMessage(field.name, message)
      }

      if (passed) {
        this.setFieldStatus(field.name, 'success')
        this.insertFieldMessage(field.name, '')
      }
    }
  }

  setFieldStatus (name, status, message = '') {
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
  }

  insertFieldMessage (name, message) {
    const field = this.form.querySelector(`#${name}`)
    const msgBox = field.parentElement.querySelector('.input-group__message')

    if (message !== '') {
      msgBox.innerHTML = message
      msgBox.classList.add('is-visible')
      field.classList.add('input-group__input--error')
    }

    if (message === '') {
      msgBox.innerHTML = message
      msgBox.classList.remove('is-visible')
      field.classList.remove('input-group__input--error')
    }
  }
}
