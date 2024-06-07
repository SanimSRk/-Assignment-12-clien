import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../Purchase/CheckoutForm';
import { useLoaderData } from 'react-router-dom';

const Payments = () => {
  const loderData = useLoaderData();
  const { description, price, coins } = loderData;
  let payment_time = new Date();
  let dd = payment_time.getDate();
  let mm = payment_time.getMonth() + 1;
  let yyyy = payment_time.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  payment_time = dd + '/' + mm + '/' + yyyy;

  return (
    <div className="shadow-lg rounded-lg md:w-2/3 border border-green-400  lg:w-1/2 mx-auto px-8 py-12 my-[110px]">
      <div>
        <h2 className="text-2xl mb-4 font-bold text-center text-green-400">
          Stripe payment gateway
        </h2>
        <p className="">
          Welcome to our Payment gateway, where your convenience and security
          are our top priorities. We've streamlined the process to ensure you
          can complete your transactions swiftly and safely.
        </p>
        <p className="my-3">date : {payment_time}</p>
        <p className="font-semibold mb-3">{description}</p>
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          price={price}
          coins={coins}
          payment_time={payment_time}
        ></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payments;
