class Form {
  constructor(){
    this.state = this.constructor.initialState()
    this.dom = new Dom()
    this.populateTipButtons()
    this.appendCustomButton()
    this.addEventListeners()
  }

  setState = (key, value) => {
    this.state[key] = value
    this.updateDOMFromState()
  }

  addEventListeners = () => {
    this.dom.resetButton.addEventListener("click", this.reset)
    this.dom.form.addEventListener("change", this.handleChange)
    this.dom.form.numberOfPeople.addEventListener("blur", this.checkForDivisionByZero)
  }

  handleChange = (e) => {
    this.setState([e.target.name], parseFloat(e.target.value))
  }

  reset = () => {
    this.dom.resetResults()
    this.dom.form.reset()
    this.state = this.constructor.initialState()
    this.populateTipButtons()
    this.appendCustomButton()
  }

  updateDOMFromState = () => {
    const { tip, bill, numberOfPeople } = this.state
    if (tip * bill * numberOfPeople !== 0) {
      this.renderResults()
    }
  }

  renderResults = () => {
    const { tip, bill, numberOfPeople } = this.state
    const tipPerPerson = (tip/100) * bill / numberOfPeople
    const totalPerPerson = (1 + (tip/100)) * bill / numberOfPeople
    this.dom.tipPerPerson.innerText = Form.toCurrency(tipPerPerson)
    this.dom.totalPerPerson.innerText = Form.toCurrency(totalPerPerson)
  }

  populateTipButtons = () => {
    this.dom.radioDiv.innerHTML = ""
    const array = [5, 10, 15, 25, 50]
    array.forEach(this.appendTipButton)
  }

  appendTipButton = tip => {
    const button = document.createElement("input")
    button.classList.add("radio-btn")
    button.type = "button"
    button.value = `${tip}%`
    button.addEventListener("click", (e) => {
      this.dom.switchSelected(e.target)
      this.setState("tip", tip)
    })
    this.dom.radioDiv.appendChild(button)
  }

  appendCustomButton = () => {
    const customTip = document.createElement("input")
    customTip.type = "button"
    customTip.classList.add("radio-btn", "custom")
    customTip.value = "Custom"
    const handleClick = () => {
      customTip.removeEventListener("click", handleClick)
      this.changeToNumberInput(customTip)
    }
    customTip.addEventListener("click", handleClick)
    this.dom.radioDiv.appendChild(customTip)
  }

  changeToNumberInput = (input) => {
    this.dom.switchSelected(input)
    input.classList.remove("radio-btn", "custom")
    input.value = 20
    input.type = "number"
    input.minimum = 0
    this.setState("tip", 20)
    input.addEventListener("focus", () => this.dom.switchSelected(input))
    input.addEventListener("change", () => this.setState("tip", parseInt(input.value)))
  }

  checkForDivisionByZero = () => {
    const numberOfPeople = this.dom.form.numberOfPeople
    if (!numberOfPeople.value || numberOfPeople.value == 0){
      this.dom.resetResults()
      this.dom.alert.innerText = "Can't be zero"
      numberOfPeople.classList.add("error")
    } else {
      this.dom.alert.innerText = ""
      numberOfPeople.classList.remove("error")
    }
  }

  static toCurrency = (float) => {
    const formatter = new Intl.NumberFormat('en-us', {
      style: 'currency',
      currency: 'USD',
    })
    return formatter.format(float)
  }

  static initialState = () => ({
    bill: 0.00,
    tip: null,
    numberOfPeople: 0,
  })
}
