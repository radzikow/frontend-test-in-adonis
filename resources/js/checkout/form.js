import FormValidator from '../form/FormValidator'

const form = document.querySelector('#completePurchaseForm')

// Form fields that will be validated (mind the order for validation messages priority).
// All available rules are in the validators.js file.
const fields = [
  {
    name: 'first_name',
    rules: ['required', 'string', 'min:2', 'max:50'],
  },
  {
    name: 'last_name',
    rules: ['required', 'string', 'min:2', 'max:50'],
  },
  {
    name: 'email',
    rules: ['required', 'email'],
  },
  {
    name: 'country',
    rules: ['required'],
  },
  {
    name: 'postal_code',
    rules: ['required', 'number', 'min:5', 'max:5'],
  },
  {
    name: 'phone',
    rules: ['required', 'phone'],
  },
  {
    name: 'credit_card',
    rules: ['required', 'card'],
  },
  {
    name: 'security_code',
    rules: ['required', 'number', 'min:3', 'max:3'],
  },
  {
    name: 'expiration_date',
    rules: ['required', 'date'],
  },
]

// Custom fields' validation messages (overwrite default messages from the messages.js file).
const messages = [
  // {
  //   name: 'first_name.required',
  //   value: 'This is custom message for first name (required)',
  // },
]

// Form initialization.
const validator = new FormValidator(form, fields, messages)

validator.initialize()
