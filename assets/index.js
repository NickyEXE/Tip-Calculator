class Form {
  constructor(){
    this.form = document.querySelector("form")
    this.state = this.constructor.initialState()
    this.populateTipButtons()
    this.appendCustomButton()
    this.addEventListeners()
  }

  setState = (key, value) => {
    this.state[key] = value
    this.updateDOMFromState()
  }

    addEventListeners = () => {
      document.getElementById("reset").addEventListener("click", this.reset)
      this.form.addEventListener("change", this.handleChange)
    }

  handleChange = (e) => {
    this.setState([e.target.name], parseFloat(e.target.value))
  }

  removeSelected = () => {
    document.querySelector(".selected")?.classList.remove("selected")
  }

  resetResults = () => {
    document.getElementById("tip-per-person").innerText = "$0.00"
    document.getElementById("total-per-person").innerText = "$0.00"
  }

  reset = () => {
    this.resetResults()
    this.form.reset()
    this.state = this.constructor.initialState()
    this.populateTipButtons()
    this.appendCustomButton()
  }

  updateDOMFromState = () => {
    const { tip, bill, numberOfPeople } = this.state
    if (tip * bill * numberOfPeople !== 0) {
      this.renderResults()
    }
    if ( numberOfPeople == 0 ) {
      this.resetResults()
      document.querySelector(".alert").innerText = "Can't be zero"
    }
  }

  renderResults = () => {
    const { tip, bill, numberOfPeople } = this.state
    const tipPerPerson = (tip/100) * bill / numberOfPeople
    const totalPerPerson = (1 + (tip/100)) * bill / numberOfPeople
    document.getElementById("tip-per-person").innerText = Form.toCurrency(tipPerPerson)
    document.getElementById("total-per-person").innerText = Form.toCurrency(totalPerPerson)
    document.querySelector(".alert").innerText = ""
  }

  populateTipButtons = () => {
    const radioDiv = document.querySelector(".radio")
    radioDiv.innerHTML = ""
    const array = [5, 10, 15, 25, 50]
    array.forEach(int => {
      const button = document.createElement("input")
      button.classList.add("radio-btn")
      button.type = "button"
      button.value = `${int}%`
      button.addEventListener("click", (e) => {
        if (e.target.classList.contains("radio-btn")){
          this.removeSelected()
          e.target.classList.add("selected")
        }
        this.setState("tip", int)
      })
      radioDiv.appendChild(button)
    })
  }

  appendCustomButton = () => {
    const radioDiv = document.querySelector(".radio")
    const customTip = document.createElement("input")
    customTip.type = "button"
    customTip.classList.add("radio-btn")
    customTip.value = "Custom"
    const handleClick = () => {
      this.changeToNumberInput(customTip)
      customTip.removeEventListener("click", handleClick)
    }
    customTip.addEventListener("click", handleClick)
    radioDiv.appendChild(customTip)
  }

  changeToNumberInput = (input) => {
    input.classList.add("selected")
    input.classList.remove("radio-btn")
    input.type = "number"
    input.minimum = 0
    input.value = 20
    this.setState("tip", 20)
    input.addEventListener("change", () => {
      this.setState("tip", parseInt(input.value))
    })
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

new Form()
