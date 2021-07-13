class Form {
  constructor(){
    this.form = document.querySelector("form")
    this.form.addEventListener("change", this.handleChange)
    this.state = this.constructor.initialState()
    this.populateButtons()
    this.addEventListeners()
  }

  setState = (key, value) => {
    this.state[key] = value
    console.log(this.state)
    this.checkResults()
  }

  populateButtons = () => {
    const radioDiv = document.querySelector(".radio")
    radioDiv.innerHTML = ""
    const array = [5, 10, 15, 25, 50]
    array.forEach(int => {
      radioDiv.innerHTML += `
      <input type="button" class="radio-btn ${this.state.tip == int ? "selected" : ""}" data-tip="${int}" value="${int}%"/>
      `
    })
  }

  handleChange = (e) => {
    this.setState(e.target.name, parseFloat(e.target.value))
  }

  addEventListeners = () => {
    document.querySelector(".radio").addEventListener("click", (e) => {
      const btn = e.target.closest(".radio-btn")
      if (btn) {
        this.setState("tip", parseInt(btn.dataset.tip))
        this.populateButtons()
      }
    })
    document.getElementById("reset").addEventListener("click", this.reset)
  }

  resetResults = () => {
    document.getElementById("tip-per-person").innerText = "$0.00"
    document.getElementById("total-per-person").innerText = "$0.00"
  }

  reset = () => {
    this.resetResults()
    this.form.reset()
    this.state = this.constructor.initialState()
    console.log(this.state)
    this.populateButtons()
  }

  checkResults = () => {
    const { tip, bill, numberOfPeople } = this.state
    if (tip * bill * numberOfPeople !== 0) {
      this.renderResults()
    } else if ( numberOfPeople == 0 ) {
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

  static toCurrency = (float) => {
    const formatter = new Intl.NumberFormat('en-us', {
      style: 'currency',
      currency: 'USD',
    })
    return formatter.format(float)
  }

  static initialState = () => ({
    bill: 0.00,
    tip: 0,
    numberOfPeople: 0,
    toggleCustom: false
  })
}

new Form()
