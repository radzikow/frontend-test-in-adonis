const creditCardInput = document.getElementById('creditCardInput')
const expirationDateInput = document.getElementById('expirationDateInput')
const securityCodeInput = document.getElementById('securityCodeInput')
const firstNameInput = document.getElementById('firstNameInput')
const lastNameInput = document.getElementById('lastNameInput')
const emailInput = document.getElementById('emailInput')
const countryInput = document.getElementById('countryInput')
const postalCodeInput = document.getElementById('postalCodeInput')
const phoneInput = document.getElementById('phoneInput')

// Add dashes to 'credit card number' input
if (creditCardInput) {
  creditCardInput.addEventListener('keydown', handleCreditCardInputKeydown)
}

function handleCreditCardInputKeydown (ev) {
  let rawNumbers = this.value.replace(/-/g, '')
  let cardLength = rawNumbers.length
  let charCode = ev.which ? ev.which : ev.keyCode
  if (charCode !== 8) {
    if (cardLength === 4 || cardLength === 10 || cardLength === 16) {
      this.value = this.value + ' - '
    }
  } else {
    if (cardLength === 7 || cardLength === 13 || cardLength === 19) {
      this.value = this.value.slice(0, -3)
    }
  }
}

// Add forward slash to 'expiration date' input
if (expirationDateInput) {
  expirationDateInput.addEventListener('keyup', handleExpirationDateInputKeyup)
}

function handleExpirationDateInputKeyup (ev) {
  let value = expirationDateInput.value
  let charCode = ev.which ? ev.which : ev.keyCode
  if (charCode !== 8) {
    if (value.length === 2) {
      expirationDateInput.value = value + ' / '
    }
  }
}

// Remove 'expiration date' input value on backspace press
if (expirationDateInput) {
  expirationDateInput.addEventListener('keydown', handleExpirationDateInputBackspace)
}

function handleExpirationDateInputBackspace (ev) {
  let charCode = ev.which ? ev.which : ev.keyCode
  if (charCode === 8) {
    expirationDateInput.value = ''
  }
}

// Remove 'security code' input value on backspace press
if (securityCodeInput) {
  securityCodeInput.addEventListener('keydown', handleSecurityCodeInputBackspace)
}

function handleSecurityCodeInputBackspace (ev) {
  let charCode = ev.which ? ev.which : ev.keyCode
  if (charCode === 8) {
    securityCodeInput.value = ''
  }
}

// Question mark tooltip (bootstrap) setup
$('#questionMarkIcon').tooltip({
  container: '#questionMarkIconContainer',
})

// Handle complete purchase form submit
const completePurchaseButton = document.getElementById('completePurchaseButton')
const completePurchaseForm = document.getElementById('completePurchaseForm')

if (completePurchaseButton) {
  completePurchaseButton.addEventListener('click', (ev) => {
    ev.preventDefault()
    let names = []
    let formElements = completePurchaseForm.querySelectorAll('.formElementData')
    formElements.forEach((element) => {
      names.push(element.getAttribute('name'))
    })
    validateFormData(completePurchaseForm, names)

    if (isValidationCorrect(completePurchaseForm)) {
      completePurchase()
    }
  })
}

// Handle inputs validation on keyup and focusout
function singleInputValidation(inputElement, name) {
  if (inputElement) {
    inputElement.addEventListener('keyup', (ev) => {
      let charCode = ev.which ? ev.which : ev.keyCode
      // prevent from validating input when jumping to another one using tab
      if (charCode !== 9) {
        validateFormData(completePurchaseForm, [name])
      }
    })
    inputElement.addEventListener('focusout', () => {
      validateFormData(completePurchaseForm, [name])
    })
  }
}

singleInputValidation(firstNameInput, 'first_name')
singleInputValidation(lastNameInput, 'last_name')
singleInputValidation(emailInput, 'email')
singleInputValidation(countryInput, 'country')
singleInputValidation(postalCodeInput, 'postal_code')
singleInputValidation(phoneInput, 'phone')
singleInputValidation(creditCardInput, 'credit_card')
singleInputValidation(securityCodeInput, 'security_code')
singleInputValidation(expirationDateInput, 'expiration_date')

// Handle inputs validation on submit button press
function validateFormData (form, names) {
  if (names.includes('first_name')) {
    hideErrorMessage(form, 'first_name')
    let value = form.querySelector('[name="first_name"]').value
    if (isValueEmpty(value)) {
      showErrorMessage(form, 'first_name', 'First name is required')
    }
  }

  if (names.includes('last_name')) {
    hideErrorMessage(form, 'last_name')
    let value = form.querySelector('[name="last_name"]').value
    if (isValueEmpty(value)) {
      showErrorMessage(form, 'last_name', 'Last name is required')
    }
  }

  if (names.includes('last_name')) {
    hideErrorMessage(form, 'last_name')
    let value = form.querySelector('[name="last_name"]').value
    if (isValueEmpty(value)) {
      showErrorMessage(form, 'last_name', 'Last name is required')
    }
  }

  if (names.includes('email')) {
    hideErrorMessage(form, 'email')
    let value = form.querySelector('[name="email"]').value
    if (isValueEmpty(value)) {
      showErrorMessage(form, 'email', 'E-mail is required')
    } else if (!isValueEmailFormat(value)) {
      showErrorMessage(form, 'email', 'E-mail format is invalid')
    }
  }

  if (names.includes('country')) {
    hideErrorMessage(form, 'country')
    let value = form.querySelector('[name="country"]').value
    if (isValueEmpty(value)) {
      showErrorMessage(form, 'country', 'Country is required')
    }
  }

  if (names.includes('postal_code')) {
    hideErrorMessage(form, 'postal_code')
    let value = form.querySelector('[name="postal_code"]').value
    if (isValueEmpty(value)) {
      showErrorMessage(form, 'postal_code', 'Postal code is required')
    } else if (value.length !== 5) {
      showErrorMessage(form, 'postal_code', 'Postal code must have 5 numbers')
    }
  }

  if (names.includes('phone')) {
    hideErrorMessage(form, 'phone')
    let value = form.querySelector('[name="phone"]').value
    if (isValueEmpty(value)) {
      showErrorMessage(form, 'phone', 'Phone number is required')
    } else if (!isValuePhoneFormat(value)) {
      showErrorMessage(form, 'phone', 'Phone number format is incorrect')
    }
  }

  if (names.includes('credit_card')) {
    hideErrorMessage(form, 'credit_card')
    let value = form.querySelector('[name="credit_card"]').value
    if (isValueEmpty(value)) {
      showErrorMessage(form, 'credit_card', 'Credit card is required')
    } else if (value.length !== 25) {
      showErrorMessage(form, 'credit_card', 'Credit card must have 16 numbers')
    } else if (!isValueCreditCardFormat(value)) {
      showErrorMessage(form, 'credit_card', 'Credit card format is incorrect')
    }
  }

  if (names.includes('security_code')) {
    hideErrorMessage(form, 'security_code')
    let value = form.querySelector('[name="security_code"]').value
    if (isValueEmpty(value)) {
      showErrorMessage(form, 'security_code', 'Security code is required')
    } else if (value.length !== 3) {
      showErrorMessage(form, 'security_code', 'Security code must have 3 numbers')
    } else if (!isValueSecurityCodeFormat(value)) {
      showErrorMessage(form, 'security_code', 'Security code format is incorrect')
    }
  }

  if (names.includes('expiration_date')) {
    hideErrorMessage(form, 'expiration_date')
    let value = form.querySelector('[name="expiration_date"]').value
    if (isValueEmpty(value)) {
      showErrorMessage(form, 'expiration_date', 'Expiration date is required')
    } else if (!isValueExpirationDateFormat(value)) {
      showErrorMessage(form, 'expiration_date', 'Expiration date format is incorrect')
    }
  }
}

// Validation helper functions
function isValidationCorrect (form) {
  let errors = 0
  let errorMessages = [...form.querySelectorAll('.error-message')]
  errorMessages.forEach(message => {
    if (message.innerHTML !== '') {
      errors++
    }
  })
  return errors > 0 ? false : true
}

function isValueEmpty (value) {
  return (value === '' || value.split(' ').join('').length === 0) ? true : false
}

function isValueEmailFormat (value) {
  // eslint-disable-next-line max-len
  let pattern = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  return pattern.test(value) ? true : false
}

function isValueSecurityCodeFormat (value) {
  let pattern = new RegExp(/^[0-9]{3}$/)
  return pattern.test(value) ? true : false
}

function isValueCreditCardFormat (value) {
  value = value.replace(/[\s-]/g, '')
  let pattern = new RegExp(/^[0-9]{16}$/)
  return pattern.test(value) ? true : false
}

function isValueExpirationDateFormat (value) {
  let pattern = new RegExp(/^(0[1-9]|1[0-2])\ \/\ ?([0-9]{4}|[0-9]{2})$/)
  return pattern.test(value) ? true : false
}

function isValuePhoneFormat (value) {
  let pattern = new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{2})?[-. ]?([0-9]{2})$/)
  return pattern.test(value) ? true : false
}

// Show/hide input error message functions
function hideErrorMessage (form, name) {
  let wrapper = form.querySelector(`[name="${name}"]`).parentElement
  let msg = wrapper.querySelector('.error-message')
  msg.classList.remove('show-message')
  if (msg) {
    msg.innerHTML = ''
  }
  wrapper.querySelector('.formElementData').classList.remove('error')
}

function showErrorMessage (form, name, message) {
  let wrapper = form.querySelector(`[name="${name}"]`).parentElement
  let msg = wrapper.querySelector('.error-message')
  msg.innerHTML = message
  msg.classList.add('show-message')
  wrapper.querySelector('.formElementData').classList.add('error')
}

// Restricts input for each element in the set of matched elements to the given inputFilter
function setInputFilter (input, inputFilter) {
  if (input) {
    ['input', 'keydown', 'keyup', 'mousedown', 'mouseup', 'select', 'contextmenu', 'drop'].forEach(function (event) {
      input.addEventListener(event, function () {
        if (inputFilter(this.value)) {
          this.oldValue = this.value
          this.oldSelectionStart = this.selectionStart
          this.oldSelectionEnd = this.selectionEnd
        } else if (this.hasOwnProperty('oldValue')) {
          this.value = this.oldValue
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd)
        } else {
          this.value = ''
        }
      })
    })
  }
}

setInputFilter(firstNameInput, value => /^[a-z']*$/i.test(value))
setInputFilter(lastNameInput, value => /^[a-z]*$/i.test(value))
setInputFilter(postalCodeInput, value => /^\d*$/.test(value))

// Store order using ajax
function completePurchase () {
  let form = document.getElementById('completePurchaseForm')
  let url = form.getAttribute('action')

  let data = new FormData()
  data.append('firstName', firstNameInput.value.trim())
  data.append('lastName', lastNameInput.value.trim())
  data.append('email', emailInput.value.trim())
  data.append('country', countryInput.value)
  data.append('postalCode', postalCodeInput.value)
  data.append('phone', phoneInput.value.trim().replace(/[\s()-]/g, ''))
  data.append('creditCard', creditCardInput.value.replace(/[\s-]/g, ''))
  data.append('CVV', securityCodeInput.value)
  data.append('expDate', expirationDateInput.value.replaceAll(' ', ''))

  const formMessage = document.querySelector('.checkout-page .form-message')

  $.ajax({
    headers: {
      'x-csrf-token': document.querySelector('input[name="_csrf"]').value,
    },
    async: true,
    type: 'POST',
    url: url,
    data: data,
    contentType: false,
    processData: false,
    success: (response) => {
      window.scrollTo(0, 0)
      formMessage.classList.remove('error')
      formMessage.classList.add('success')
      formMessage.innerHTML = response.message
      setTimeout(() => {
        window.location.href = 'http://127.0.0.1:3333/'
      }, 6000)
    },
    error: (response) => {
      window.scrollTo(0, 0)
      formMessage.classList.remove('success')
      formMessage.classList.add('error')
      formMessage.innerHTML = 'Error occurred. Please check if the form is correctly completed.'
    },
  })
}
