const regex = {
  // eslint-disable-next-line max-len
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  string: /^[a-zA-Z']+$/,
  number: /^\d*$/,
  phone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{2})?[-. ]?([0-9]{2})$/,
  date: /^(0[1-9]|1[0-2])\ \/\ ?([0-9]{4}|[0-9]{2})$/,
  card: /^[0-9]{16}$/,
}

const useRegex = (val, rule) => regex[rule].test(val.trim()) ? true : false

const required = (val) => val.trim() !== '' ? true : false

const email = val => useRegex(val, 'email')

const string = val => useRegex(val, 'string')

const number = val => useRegex(val, 'number')

const phone = val => useRegex(val, 'phone')

const date = val => useRegex(val, 'date')

const card = val => useRegex(val.replace(/[\s-]/g, ''), 'card')

export {
  required,
  email,
  string,
  number,
  phone,
  date,
  card,
}
