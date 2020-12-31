import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({price}) => {
  const priceForStripe = price * 100
  const publishableKey = 'pk_test_51I458rDBYfu4lsuXGqcXYdB1LETlks8SYgcjc1e5xnDCJzfCvE15VgOLZZ0t6RmFb5MhKGY1WUusWtOzUUwYSCSW00zI6MnvRv'

  const onToken = token => {
    console.log(token)
    alert('Payment Sucessful')
  }

  return (
    <StripeCheckout 
      label='Pay Now'
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton