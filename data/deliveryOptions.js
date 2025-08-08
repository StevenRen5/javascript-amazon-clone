import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

// create a list of delivery options
// that can be accessed by their id
export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0,
}, {
    id: '2',
    deliveryDays: 3,
    priceCents: 499,
}, {
    id: '3',
    deliveryDays: 1,
    priceCents: 999,
}];


export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });
    return deliveryOption || deliveryOptions[0]; // return the first option if not provided with a delivery option id
}

export function calculateDeliveryDate(deliveryOption){
  const today = dayjs(); // get today's date
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days'); // add delivery days to today's date

  const weekdaysdeliveryDate = skipSatSun(deliveryDate);

  const weekdaysDataString = weekdaysdeliveryDate.format('dddd, MMMM D'); // format the date as: day of week, month, day

  return weekdaysDataString;
}

// skips delivery days for Saturday and Sunday
export function skipSatSun(deliveryDate) {
  if (deliveryDate.format('dddd') === 'Saturday'){
    return deliveryDate.add(2, 'days');
  }
  else if (deliveryDate.format('dddd') === 'Sunday') {
    return deliveryDate.add(1, 'days');
  }
  else {
    return deliveryDate;
  }
}