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

      submit(this.form, this.state._state)
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
    let validationFunctions = [required, string, email, number, phone, date, card, min, max]

    if (field.name === input.name) {
      let passed = true
      let currentRule = ''

      field.rules.forEach(rule => {
        if (passed && field.rules.includes(rule)) {
          validationFunctions.forEach(f => {
            // handle rules with parameter, like: min, max
            if (rule.includes('min') || rule.includes('max')) {
              let ruleSet = rule.split(':')

              if (f.name === ruleSet[0]) {
                currentRule = rule
                passed = f(input.value, ruleSet[1])
              }
            } else { // handle other rules
              if (f.name === rule) {
                currentRule = rule
                passed = f(input.value)
              }
            }
          })
        }
      })

      if (!passed) {
        let message = getMessage(field.name, currentRule, this.messages)
        this.setStatus(field.name, 'error', message)
        this.insertMessage(field.name, message)
      }

      if (passed) {
        this.setStatus(field.name, 'success')
        this.insertMessage(field.name, '')
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
  }

  insertMessage (name, message) {
    let field = this.form.querySelector(`#${name}`)
    let msgBox = field.parentElement.querySelector('.input-group__message')

    if (message !== '') {
      msgBox.innerHTML = message
      msgBox.classList.add('is-visible')
      field.classList.add('error')
    }

    if (message === '') {
      msgBox.innerHTML = message
      msgBox.classList.remove('is-visible')
      field.classList.remove('error')
    }
  }
}
