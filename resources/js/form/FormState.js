export default class FormState {
  _state = {}

  getState () {
    return this._state
  }

  getField (id) {
    return this._state[id]
  }

  setField (field) {
    if (!this._state[field]) {
      this._state = { ...this._state, ...field }
    }
  }

  updateField (id, props) {
    this._state[id][props.key] = props.value
    this.validateField(id, this._state[id])
  }

  deleteField (field) {
    if (this._state[field]) {
      delete this._state[field]
    }
  }
}
