const currencies = [
  'AED',
  'ARS',
  'AUD',
  'BGN',
  'BRL',
  'BSD',
  'CAD',
  'CHF',
  'CLP',
  'CNY',
  'COP',
  'CZK',
  'DKK',
  'DOP',
  'EGP',
  'EUR',
  'FJD',
  'GBP',
  'GTQ',
  'HKD',
  'HRK',
  'HUF',
  'IDR',
  'ILS',
  'INR',
  'ISK',
  'JPY',
  'KRW',
  'KZT',
  'MXN',
  'MYR',
  'NOK',
  'NZD',
  'PAB',
  'PEN',
  'PHP',
  'PKR',
  'PLN',
  'PYG',
  'RON',
  'RUB',
  'SAR',
  'SEK',
  'SGD',
  'THB',
  'TRY',
  'TWD',
  'UAH',
  'USD',
  'UYU',
  'VND',
  'ZAR',
];

const currencySelectFirst = document.getElementById('currency-first');
const currencySelectSecond = document.getElementById('currency-second');
const amountInputFirst = document.getElementById('amount-first');
const amountInputSecond = document.getElementById('amount-second');
const rateElement = document.getElementById('rate-element');
const swapElement = document.getElementById('swap-element');

for (const currency of currencies) {
  const optionFirst = new Option(currency, currency);
  const optionSecond = new Option(currency, currency);
  currencySelectFirst.add(optionFirst);
  currencySelectSecond.add(optionSecond);
}

const calculate = () => {
  const currencyFirstValue = currencySelectFirst.value;
  const currencySecondValue = currencySelectSecond.value;
  fetch('https://open.exchangerate-api.com/v6/latest')
    .then((res) => res.json())
    .then((data) => {
      const rate =
        data.rates[currencySecondValue] / data.rates[currencyFirstValue];
      rateElement.innerText = `1 ${currencyFirstValue}= ${rate} ${currencySecondValue}`;
      amountInputSecond.value = (amountInputFirst.value * rate).toFixed(2);
    });
};

[
  currencySelectFirst,
  amountInputFirst,
  currencySelectSecond,
  amountInputSecond,
].forEach((element) => {
  element.addEventListener('change', calculate);
  element.addEventListener('input', calculate);
});

swapElement.addEventListener('click', () => {
  [currencySelectFirst.value, currencySelectSecond.value] = [
    currencySelectSecond.value,
    currencySelectFirst.value,
  ];
  calculate();
});

calculate();
