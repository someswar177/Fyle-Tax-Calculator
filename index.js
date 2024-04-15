function validateForm() {
    var grossIncome = document.getElementById('grossIncome').value;
    var extraIncome = document.getElementById('extraIncome').value;
    var deductions = document.getElementById('deductions').value;
    var ageGroup = document.getElementById('ageGroup').value;

    // Regular expression to match only numbers
    var numberPattern = /^\d+$/;

    // Check if any input contains non-numeric characters
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

    // If any input is invalid, stop submission
    if (invalidInput) {
        return;
    }

    calculateTax(parseFloat(grossIncome), parseFloat(extraIncome), ageGroup, parseFloat(deductions));
}


  function calculateTax(grossIncome, extraIncome, ageGroup, deductions) {
    // var grossIncome = parseFloat(document.getElementById('grossIncome').value);
    // var extraIncome = parseFloat(document.getElementById('extraIncome').value);
    // var ageGroup = document.getElementById('ageGroup').value;
    // var deductions = parseFloat(document.getElementById('deductions').value);

    // Calculate overall income after deductions
    var overallIncome = grossIncome + extraIncome - deductions;

    // Calculate tax based on age group
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

    // Prepare result message
    // var resultMessage = overallIncome.toFixed(2);
    var resultMessage;
    if (tax > 0) {
      resultMessage = tax.toFixed(2) + " Rupees";
    } else {
      resultMessage += "No tax to be paid.";
    }

    // Display result in modal
    document.getElementById('resultText').innerHTML = resultMessage;
    var resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
    resultModal.show();
  }