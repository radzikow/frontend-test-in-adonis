import axios from 'axios'

export const submit = (form, state) => {
  console.log('form submit')

  form.addEventListener('submit', e => {
    e.preventDefault()

    if (validationPassed(state)) {
      let data = {}

      // get form data to send to the backend

      axios
        .post('/order', data)
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }
  })
}

const validationPassed = state => {
  return state === {} ? true : false
}

// show message on the page
const showFormMessage = (message) => {

}
