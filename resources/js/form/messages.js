// Default field validation messages
const defaultMessages = {
  required: ':name is required',
  string: ':name must be a string',
  email: 'E-mail address format is invalid',
  phone: 'Phone number format is invalid',
  number: ':name must contain only numbers',
  date: 'Date format is invalid',
  card: 'Credit card format is invalid',
  min: ':name must contain minimum :number characters',
  max: ':name must contain maximum :number characters',
}

export const getMessage = (name, rule, messages) => {
  let finalMessage
  let nName = name[0].toUpperCase() + name.slice(1)
  nName = nName.split('_').length > 1 ? nName.split('_').join(' ') : nName

  if (rule.includes('min') || rule.includes('max')) {
    let ruleSet = rule.split(':')
    finalMessage = defaultMessages[ruleSet[0]].replaceAll(':name', nName)
    finalMessage = finalMessage.replaceAll(':number', ruleSet[1])
  } else {
    finalMessage = defaultMessages[rule].replaceAll(':name', nName)
  }

  if (messages && messages.length > 0) {
    messages.forEach(message => {
      if (message.name.includes(name) && message.name.includes(rule)) {
        finalMessage = message.value
      }
    })
  }

  return finalMessage
}
