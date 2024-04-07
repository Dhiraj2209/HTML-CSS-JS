function printForm() {
    window.print();
}

document.addEventListener('DOMContentLoaded', function() {
    var inputs = document.querySelectorAll('.ifsc-input, .acc-input');

    inputs.forEach(function(input, index) {
        input.addEventListener('input', function() {
            if (this.value.length === 1) {
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            }
        });

        input.addEventListener('keydown', function(event) {
            if (event.key === 'Backspace' && this.value.length === 0) {
                if (index > 0) {
                    inputs[index - 1].focus();
                }
            }
        });
    });
});

// Function to convert amount in figures to words
function convertAmountToWords(amount) {
    const singleDigits = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    if (amount == 0) {
        return "Zero";
    }

    if (amount < 10) {
        return singleDigits[amount];
    }

    if (amount >= 10 && amount < 20) {
        return teens[amount - 10];
    }

    if (amount >= 20 && amount < 100) {
        return tens[Math.floor(amount / 10)] + " " + singleDigits[amount % 10];
    }

    if (amount >= 100 && amount < 1000) {
        return singleDigits[Math.floor(amount / 100)] + " Hundred " + convertAmountToWords(amount % 100);
    }

    if (amount >= 1000 && amount < 100000) {
        return convertAmountToWords(Math.floor(amount / 1000)) + " Thousand " + convertAmountToWords(amount % 1000);
    }

    if (amount >= 100000 && amount < 10000000) {
        return convertAmountToWords(Math.floor(amount / 100000)) + " Lakh " + convertAmountToWords(amount % 100000);
    }

    return "Amount too large to convert";
}

// Function to update amount in words based on input value
function updateAmountWords() {
    const amountInFigures = document.getElementById("neftRtgsAmtFigures").value;
    const amountInWordsField = document.getElementById("neftRtgsAmtWords");
    amountInWordsField.value = convertAmountToWords(amountInFigures);
}
// Event listener to update amount in words on input change
document.getElementById("neftRtgsAmtFigures").addEventListener("input", updateAmountWords);

function updateTotalAmountWords() {
    const totalAmountInFigures = document.getElementById("totalAmountFigures").value;
    const totalAmountInWordsField = document.getElementById("totalAmountWords");
    totalAmountInWordsField.value = convertAmountToWords(totalAmountInFigures);
}
document.getElementById("totalAmountFigures").addEventListener("input", updateTotalAmountWords);

// Get references to the select and input elements
const accountSelect = document.getElementById("accountname");
const debitAccountInput = document.getElementById("debitAccountNumber");
const contactNoInput = document.getElementById("contactNo");

// Define account numbers and contact numbers for each company
const companyInfo = {
    prakash: {
        accountNumber: "055XXXXXXXX",
        contactNumber: "94XXXXXXXX"
    },
    charbhuja: {
        accountNumber: "039XXXXXXXX",
        contactNumber: "99XXXXXXXX"
    }
};

// Function to update debit account number and contact number based on selected company
function updateCompanyInfo() {
    const selectedOption = accountSelect.value;
    const companyData = companyInfo[selectedOption];
    if (companyData) {
        debitAccountInput.value = companyData.accountNumber;
        contactNoInput.value = companyData.contactNumber;
    } else {
        debitAccountInput.value = ""; // Clear the input if no corresponding company data found
        contactNoInput.value = ""; // Clear the input if no corresponding company data found
    }
}

// Add event listener to the select element
accountSelect.addEventListener("change", updateCompanyInfo);

// Call the function once to set the initial value based on the default selected option
updateCompanyInfo();