export function determineRepayments(
  amount: number,
  term: number,
  interest: number,
  type: string
) {
  const monthlyInterest = interest / 12 / 100;
  const numberOfPeriods = term * 12;
  const monthlyPayments = PMT(
    monthlyInterest,
    numberOfPeriods,
    amount,
    type === "Interest Only" ? amount : 0,
    false
  );
  const totalRepayment = monthlyPayments * numberOfPeriods;
  const totalInterest = totalRepayment - amount;
  const monthlyInterestOnly = amount * (interest / 12 / 100);
  const totalInterestOnlyRepayment =
    amount + monthlyInterestOnly * numberOfPeriods;
  const monthlyRepayment =
    type === "Repayment" ? monthlyPayments : monthlyInterestOnly;
  return {
    monthlyRepayment: monthlyRepayment.toFixed(2),
    totalRepayment:
      type === "Repayment"
        ? totalRepayment.toFixed(2)
        : totalInterestOnlyRepayment.toFixed(2),
    totalInterest: totalInterest.toFixed(2),
  };
}

const PMT = (
  rate: number,
  nper: number,
  pv: number,
  fv: number,
  type: boolean
) => {
  /*
   * rate   - interest rate per month
   * nper   - number of periods (months)
   * pv   - present value
   * fv   - future value
   * type - when the payments are due:
   *        0: end of the period, e.g. end of month (default)
   *        1: beginning of period
   */
  let pmt, pvif;
  fv || (fv = 0);
  type || (type = false);
  if (rate === 0) return -(pv + fv) / nper;
  pvif = Math.pow(1 + rate, nper);
  pmt = (rate * (pv * pvif + fv)) / (pvif - 1);
  if (type) pmt /= 1 + rate;
  return pmt;
};
