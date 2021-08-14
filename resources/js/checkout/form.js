import FormValidator from '../form/FormValidator'

const formElement = document.querySelector('#completePurchaseForm')

// Form fields that will be validated (mind the order for the validation messages priority).
// All available validation rules are in the validators.js file.
const formFieldsNamesAndValidationRules = [
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

// Custom validation fields' messages (overwrite default messages from the messages.js file).
const customValidationMessages = [
  // {
  //   name: 'first_name.required',
  //   value: 'This is custom message for first name (required)',
  // },
]

// Form initialization.
const formValidator = new FormValidator(formElement, formFieldsNamesAndValidationRules, customValidationMessages)

formValidator.initialize()
