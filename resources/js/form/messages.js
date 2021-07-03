// Default field validation messages
const defaultMessages = {
  required: ':name is required',
  string: ':name must be a string',
  email: 'E-mail address format is invalid',
  phone: 'Phone number format is invalid',
  number: ':name must contain only numbers',
  date: 'Date format is invalid',
  card: 'Credit card format is invalid',
}

export const getMessage = (name, rule, messages) => {
  let nName = name[0].toUpperCase() + name.slice(1)
  nName = nName.split('_').length > 1 ? nName.split('_').join(' ') : nName

  let finalMessage = defaultMessages[rule].replaceAll(':name', nName)

  if (messages && messages.length > 0) {
    messages.forEach(message => {
      if (message.name.includes(name) && message.name.includes(rule)) {
        finalMessage = message.value
      }
    })
  }

  return finalMessage
}
