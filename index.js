function validateForm() {
    var grossIncome = document.getElementById('grossIncome').value;
    var extraIncome = document.getElementById('extraIncome').value;
    var deductions = document.getElementById('deductions').value;
    var ageGroup = document.getElementById('ageGroup').value;
    var numberPattern = /^\d+$/;
    var invalidInput = false;
    if (!numberPattern.test(grossIncome)) {
        document.getElementById('error-grossIncome').classList.remove('d-none');
        invalidInput = true;
    } else {
        document.getElementById('error-grossIncome').classList.add('d-none');
    }

    if (!numberPattern.test(extraIncome)) {
        document.getElementById('error-extraIncome').classList.remove('d-none');
        invalidInput = true;
    } else {
        document.getElementById('error-extraIncome').classList.add('d-none');
    }

    if (!numberPattern.test(deductions)) {
        document.getElementById('error-deductions').classList.remove('d-none');
        invalidInput = true;
    } else {
        document.getElementById('error-deductions').classList.add('d-none');
    }

    if (invalidInput) {
        return;
    }

    calculateTax(parseFloat(grossIncome), parseFloat(extraIncome), ageGroup, parseFloat(deductions));
}


function calculateTax(grossIncome, extraIncome, ageGroup, deductions) {
    var overallIncome = grossIncome + extraIncome - deductions;
    var tax = 0;
    if (overallIncome > 800000) {
        if (ageGroup === "<40") {
            tax = 0.3 * (overallIncome - 800000);
        } else if (ageGroup === "≥40 &lt;60") {
            tax = 0.4 * (overallIncome - 800000);
        } else if (ageGroup === "≥60") {
            tax = 0.1 * (overallIncome - 800000);
        }
    }
    overallIncome = overallIncome - tax

    var resultMessage = overallIncome.toFixed(2) + " Rupees";;
    var taxInfo;
    if (tax > 0) {
        taxInfo = `after tax deductions (${tax} rupees)`
    } else {
        taxInfo = "No tax to be paid.";
    }

    document.getElementById('resultText').innerHTML = resultMessage;
    document.getElementById('taxInfo').innerHTML = taxInfo;
    var resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
    resultModal.show();
}