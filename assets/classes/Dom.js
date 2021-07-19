class Dom {
  constructor(){
    this.form = document.querySelector("form")
    this.resetButton = document.getElementById("reset")
    this.alert = document.querySelector(".alert")
    this.radioDiv = document.querySelector(".radio")
    this.tipPerPerson = document.getElementById("tip-per-person")
    this.totalPerPerson = document.getElementById("total-per-person")
  }

  switchSelected = (element) => {
    document.querySelector(".selected")?.classList.remove("selected")
    element.classList.add("selected")
  }

  resetResults = () => {
    this.tipPerPerson.innerText = "$0.00"
    this.totalPerPerson.innerText = "$0.00"
    this.resetButton.disabled = true
  }

  addAlert = () => {
    const container = this.form.numberOfPeople.closest(".number-input")
    this.dom.resetResults()
    this.dom.alert.innerText = "Can't be zero"
    container.classList.add("error")
  }

  removeAlert = () => {
    const container = this.form.numberOfPeople.closest(".number-input")
    this.dom.alert.innerText = ""
    container.classList.remove("error")
  }

}
