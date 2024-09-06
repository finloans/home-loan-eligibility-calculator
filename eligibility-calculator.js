function calculateEligibility() {
    // Get the input values
    let age = parseFloat(document.getElementById("age").value);
    let grossSalary = parseFloat(document.getElementById("grossSalary").value);
    let existingEMIs = parseFloat(document.getElementById("existingEMIs").value);
    let interestRate = parseFloat(document.getElementById("interestRate").value);
    let loanTenure = parseFloat(document.getElementById("loanTenure").value);

    // Validate age
    if (age < 21 || age > 65) {
        document.getElementById("result").innerHTML = "Age must be between 21 and 65 years.";
        return;
    }

    // Determine the Net Take Home Pay (NTHP) percentage based on salary slab
    let minNTHPPercentage;
    let minNTHP;
    if (grossSalary <= 50000) {
        minNTHPPercentage = 0.4; // 40%
    } else if (grossSalary > 50000 && grossSalary <= 100000) {
        minNTHPPercentage = 0.3; // 30%
        minNTHP = 20000; // Ensure at least ₹20,000 is NTHP
    } else if (grossSalary > 100000) {
        minNTHPPercentage = 0.25; // 25%
        minNTHP = 30000; // Ensure at least ₹30,000 is NTHP
    }

    // Calculate the NTHP after deducting existing EMIs
    let maxEMIAllowed = grossSalary * minNTHPPercentage;
    let nthpAfterEMIs = grossSalary - existingEMIs;

    // Check if the NTHP meets the required percentage and minimum limits
    if (nthpAfterEMIs < maxEMIAllowed || (minNTHP && nthpAfterEMIs < minNTHP)) {
        document.getElementById("result").innerHTML = "Your Net Take Home Pay does not meet the required criteria.";
        return;
    }

    // Convert loan tenure to months
    let tenureInMonths = loanTenure * 12;

    // Calculate the maximum allowable EMI
    let maxEMI = nthpAfterEMIs;

    // Convert annual interest rate to monthly and calculate EMI factor
    let monthlyInterestRate = interestRate / (12 * 100);
    let emiFactor = (Math.pow(1 + monthlyInterestRate, tenureInMonths) - 1) / (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenureInMonths));

    // Calculate maximum loan eligibility
    let loanEligibility = maxEMI * emiFactor;

    // Round off the results
    loanEligibility = loanEligibility.toFixed(2);

    // Display the result
    document.getElementById("result").innerHTML = `You are eligible for a loan amount of ₹${loanEligibility}`;
}
