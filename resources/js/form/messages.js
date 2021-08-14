// Default form validation messages
const defaultFormValidationMessages = {
  required: ':field is required',
  string: ':field must be a string',
  email: 'E-mail address format is invalid',
  phone: 'Phone number format is invalid',
  number: ':field must contain only numbers',
  date: 'Date format is invalid',
  card: 'Credit card format is invalid',
  min: ':field must contain minimum :number characters',
  max: ':field must contain maximum :number characters',
}

export const getMessage = (fieldName, rule, messages) => {
  let finalValidationMessage
  let newFieldName = fieldName[0].toUpperCase() + fieldName.slice(1)
  newFieldName = newFieldName.split('_').length > 1 ? newFieldName.split('_').join(' ') : newFieldName

  if (rule.includes('min') || rule.includes('max')) {
    let ruleSet = rule.split(':')
    finalValidationMessage = defaultFormValidationMessages[ruleSet[0]].replaceAll(':field', newFieldName)
    finalValidationMessage = finalValidationMessage.replaceAll(':number', ruleSet[1])
  } else {
    finalValidationMessage = defaultFormValidationMessages[rule].replaceAll(':field', newFieldName)
  }

  if (messages && messages.length > 0) {
    messages.forEach(message => {
      if (message.name.includes(fieldName) && message.name.includes(rule)) {
        finalValidationMessage = message.value
      }
    })
  }

  return finalValidationMessage
}
