export default class FormState {
  _state = {}

  getState () {
    return this._state
  }

  getField (field) {
    return this._state[field]
  }

  setField (field) {
    if (!this._state[field]) {
      this._state = { ...this._state, ...field }
    }
  }

  updateField (field, props) {
    this._state[field][props.key] = props.value
    this.validateField(field, this._state[field])
  }

  deleteField (field) {
    if (this._state[field]) {
      delete this._state[field]
    }
  }
}
