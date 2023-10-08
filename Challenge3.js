// Determine the PAYE for remitance
const PAYE_RATES_2023 = [
    { minMonthly: 0, maxMonthly: 24000, rate: 10 },
    { minMonthly: 24001, maxMonthly: 32333, rate: 25 },
    { minMonthly: 32334, maxMonthly: 500000, rate: 30 },
    { minMonthly: 500001, maxMonthly: 800000, rate: 32.5 },
    { minMonthly: 800001, maxMonthly: Infinity, rate: 35 },
  ];
  
  // Determine the NHIF amount to be remitted
  const NHIF_RATES = [
    { minGrossPay: 0, maxGrossPay: 5999, deduction: 150 },
    { minGrossPay: 6000, maxGrossPay: 7999, deduction: 300 },
    { minIncome: 8000, maxIncome: 11999, deduction: 400 },
    { minIncome: 12000, maxIncome: 14999, deduction: 500 },
    { minIncome: 15000, maxIncome: 19999, deduction: 600 },
    { minIncome: 20000, maxIncome: 24999, deduction: 750 },
    { minIncome: 25000, maxIncome: 29999, deduction: 850 },
    { minIncome: 30000, maxIncome: 34999, deduction: 900 },
    { minIncome: 35000, maxIncome: 39999, deduction: 950 },
    { minIncome: 40000, maxIncome: 44999, deduction: 1000 },
    { minIncome: 45000, maxIncome: 49999, deduction: 1100 },
    { minIncome: 50000, maxIncome: 59999, deduction: 1200 },
    { minIncome: 60000, maxIncome: 69999, deduction: 1300 },
    { minIncome: 70000, maxIncome: 79999, deduction: 1400 },
    { minIncome: 80000, maxIncome: 89999, deduction: 1500 },
    { minIncome: 90000, maxIncome: Infinity, deduction: 1700 },
  ];
//  Determine the housing levy imposed
const HOUSING_LEVY_RATE = 1.5; // Affordable Housing Levy rate

//Determine the PAYE using the taxable income
function calculatePAYE(taxableIncome) {
  for (const rate of PAYE_RATES_2023) {
    if (taxableIncome >= rate.minMonthly && taxableIncome <= rate.maxMonthly) {
      return (taxableIncome * rate.rate) / 100;
    }
  }
  return 0;
}

// Determine NHIF deduction based on gross pay
function calculateNHIF(grossPay) {
  for (const rate of NHIF_RATES) {
    if (grossPay >= rate.minGrossPay && grossPay <= rate.maxGrossPay) {
      return rate.deduction;
    }
  }
  return 0;
}

// Determine the net salary
function calculateNetSalary(basicSalary, benefits) {
  const grossPay = basicSalary + benefits;
  
  // Calculate PAYE through subtracting personal relief
  const taxableIncome = grossPay - 2400;  
  const paye = calculatePAYE(taxableIncome);
  
  // Calculate NHIF
  const nhif = calculateNHIF(grossPay);
  
  // Calculate housing levy
  const housingLevy = (grossPay * HOUSING_LEVY_RATE) / 100;
  
  // Calculate net salary
  const netSalary = grossPay - paye - nhif - housingLevy;
  
  return netSalary;
}

// For instance
const basicSalary = 276450
const benefits = 0;
const netSalary = calculateNetSalary(basicSalary, benefits);

console.log(`Net Salary: Ksh ${netSalary.toFixed(2)}`);