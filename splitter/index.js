const bill = document.querySelector("#bill")
const numPeople = document.querySelector("#numP")
const totAmount = document.querySelector(".totAmount")
const tipAmount = document.querySelector(".tipAmount")
const buttons = document.querySelectorAll(".tip")
const resetBtn = document.querySelector("#resetBtn")
// const form = document.querySelector("#myForm")
//
// form.addEventListener("submit", () => {
//     form.preventDefault()
// })

numPeople.addEventListener('input', () => {
    bill.disabled = numPeople.value.trim() === "";
});

let people;

function tipDivider(billValue) {
    buttons.forEach((elem) => {
        elem.addEventListener("click", () => {
            let tip
            if (elem.valueOf() !== "custom"){
                tip = billValue * (elem.value/100);
            }else{
                tip = billValue * (customTip(elem).value/100);
            }
            const tipPerPerson = tip / people;
            if (tipPerPerson !== 0) tipAmount.textContent = "$" + String(tipPerPerson);
            else tipAmount.textContent = "$0.00"
        })
    })
}

const customTip = (customElement) =>{
    let t;
    customElement.addEventListener("keyup", (e) => {
        t = e.target.value;
    })
    return t;
}

const updateTot = (people) => {
    bill.addEventListener("keyup", (e) => {
        const billValue = parseFloat(e.target.value);
        if (!isNaN(billValue) && people > 0) {
            totAmount.textContent = "$" + String(billValue / people);
            tipDivider(billValue);
            updateTot(people)
        }else{
            totAmount.textContent = "$0.00";
        }
    });
}


numPeople.addEventListener("keyup", (e) => {
    people = e.target.value
    bill.disabled = people === "";
    if (people === "") {
        totAmount.textContent = "$0.00";
    }
    updateTot(people)
})

resetBtn.addEventListener("click", () =>{
    tipAmount.textContent = "$0.00"
    totAmount.textContent = "$0.00"
    bill.value = "0"
    numPeople.value = "0"
})