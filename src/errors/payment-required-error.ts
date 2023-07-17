export function paymentRequiredError() {
  return {
    name: 'PaymentError',
    message: `Payment is required to this operation`,
  };
}
