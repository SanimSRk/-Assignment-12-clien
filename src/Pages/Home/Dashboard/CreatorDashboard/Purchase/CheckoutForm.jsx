import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './ChackoutCss/common.css';
import { useEffect, useState } from 'react';
import useAxiosPublice from '../../../../../Hooks/AxiosPublic/useAxiosPublice';
import useAuth from '../../../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import useUser from '../../../../../Hooks/useUser';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../../../Hooks/AxiosSecure/useAxiosSecure';
const CheckoutForm = ({ price, payment_time, coins }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState();
  const [cartError, setCartError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState();
  const { data, refetch } = useUser();
  const navigates = useNavigate();
  useEffect(() => {
    if (price > 0) {
      axiosSecure.post('/create-payment-intent', { price }).then(res => {
        console.log(res?.data?.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price]);

  const handleSubmit = async event => {
    event.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) {
      return;
    }

    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setProcessing(false);
      setCartError(error.message);
      return;
    } else {
      setCartError('');
      console.log('[PaymentMethod]', paymentMethod);
    }

    //confram payment
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      setCartError(confirmError.message);
      setProcessing(false);
      return;
    } else {
      if (paymentIntent.status === 'succeeded') {
        setTransactionId(paymentIntent?.id);

        const payment = {
          email: user?.email,
          transactionId: paymentIntent?.id,
          date: payment_time,
          coin: coins,
          price: price,
          name: user?.displayName,
        };
        const coin = coins;
        const coinIfo = { coin };
        axiosSecure.post('/payments', payment).then(res => {
          console.log(res.data);
          if (res.data.insertedId) {
            axiosSecure
              .patch(`/increase?email=${user?.email}`, coinIfo)
              .then(res => {
                console.log(res.data);
                if (res.data.matchedCount) {
                  Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Suscess fully Purchase Coin',
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  navigates('/dashboard/paymentHistorys');
                  refetch();
                }
              });
          }
        });
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button
          className="btn bg-green-100 text-green-800"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay ${price}
        </button>
      </form>
      {cartError && <p className="text-red-500 font-semibold">{cartError} </p>}
    </div>
  );
};

export default CheckoutForm;
