class Form {
  constructor(){
    this.element = document.querySelector("form")
    this.element.addEventListener("change", this.handleChange)
    this.state = {
      bill: 0.00,
      tip: 0,
      numberOfPeople: 0
    }
  }

  handleChange = (e) => {
    console.log(e.target)
    this.state[e.target.name] = parseFloat(e.target.value)
    e.target.name == "numberOfPeople" && this.updateResults()
  }

  updateResults = () => {
    const { tip, bill, numberOfPeople } = this.state
    const tipPerPerson = (tip/100) * bill / numberOfPeople
    const totalPerPerson = (1 + (tip/100)) * bill / numberOfPeople
    console.log(tipPerPerson, totalPerPerson)
    document.getElementById("tip-per-person").innerText = Form.toCurrency(tipPerPerson)
    document.getElementById("total-per-person").innerText = Form.toCurrency(totalPerPerson)
  }

  static toCurrency = (float) => {
    const formatter = new Intl.NumberFormat('en-us', {
      style: 'currency',
      currency: 'USD',
    })
    return formatter.format(float)
  }
}

new Form()
