
// Add dashes to 'credit card number' input
const creditCardInput = document.getElementById('credit_card')

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
const expirationDateInput = document.getElementById('expiration_date')

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
const securityCodeInput = document.getElementById('security_code')

if (securityCodeInput) {
  securityCodeInput.addEventListener('keydown', handleSecurityCodeInputBackspace)
}

function handleSecurityCodeInputBackspace (ev) {
  let charCode = ev.which ? ev.which : ev.keyCode
  if (charCode === 8) {
    securityCodeInput.value = ''
  }
}
