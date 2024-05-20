const bill = document.querySelector("#bill")
const numPeople = document.querySelector("#numP")
const totAmount = document.querySelector(".totAmount")
const tipAmount = document.querySelector(".tipAmount")
const buttons = document.querySelectorAll(".tip")
const resetBtn = document.querySelector("#resetBtn")
const hamburger = document.querySelector("#ham")
const nav = document.getElementById("nav")
const main = document.getElementById("main")
// const form = document.querySelector("#myForm")
//
// form.addEventListener("submit", () => {
//     form.preventDefault()
// })

let hamClicked = false;
hamburger.addEventListener("click", () => {
    if (!hamClicked){
        nav.style.top = "0px";
        hamClicked = true;
        main.classList.add("blur")
    }else {
        nav.style.top = "-42px";
        hamClicked = false
        main.classList.remove("blur")
    }
})

numPeople.addEventListener('input', () => {
    bill.disabled = numPeople.value.trim() === "";
});

let people;

function tipDivider(billValue) {
    buttons.forEach((elem) => {
        elem.addEventListener("click", () => {
            let tip;
            if (elem.value !== "custom") {
                tip = billValue * (elem.value / 100);
            } else {
                tip = billValue * (customTip(elem).value / 100);
            }
            const tipPerPerson = tip / people;

            // Calculate the total amount per person
            const initialAmountPerPerson = billValue / people;
            const totPerPerson = initialAmountPerPerson + tipPerPerson;

            // Update the total amount text content
            totAmount.textContent = "$" + totPerPerson.toFixed(2);

            // Update the tip amount text content
            if (tipPerPerson !== 0) {
                tipAmount.textContent = "$" + tipPerPerson.toFixed(2);
            } else {
                tipAmount.textContent = "$0.00";
            }
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