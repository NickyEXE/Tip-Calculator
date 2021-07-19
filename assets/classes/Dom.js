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
    this.removeAlert()
  }

  addAlert = () => {
    const container = this.form.numberOfPeople.closest(".number-input")
    this.resetResults()
    this.alert.innerText = "Can't be zero"
    container.classList.add("error")
  }

  removeAlert = () => {
    const container = this.form.numberOfPeople.closest(".number-input")
    this.alert.innerText = ""
    container.classList.remove("error")
  }

}
