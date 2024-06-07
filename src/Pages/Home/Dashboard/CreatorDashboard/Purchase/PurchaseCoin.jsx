import { useEffect, useState } from 'react';
import { CiCoinInsert } from 'react-icons/ci';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import useAxiosPublice from '../../../../../Hooks/AxiosPublic/useAxiosPublice';

const PurchaseCoin = () => {
  const [datas, setData] = useState([]);
  const [priceData, setPriceData] = useState();
  const axiosPublice = useAxiosPublice();
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

  useEffect(() => {
    axiosPublice.get('/buyCart').then(res => {
      setData(res.data);
    });
  }, []);
  const handileClickData = id => {
    axiosPublice.get(`/buy-cartId/${id}`).then(res => {
      setPriceData(res?.data);
    });
  };

  return (
    <div>
      <div className="lg:w-2/3 md:w-2/3 mx-auto text-center">
        <h2 className="text-2xl font-bold text-green-500">
          This is Purchase section
        </h2>
        <p className="mt-3">
          Welcome to our coin purchase section! Here, you can choose from a
          variety of coin packages to enhance your experience on our platform.
        </p>
      </div>
      <div className="grid lg:grid-cols-3 mt-12 text-black gap-6 md:grid-cols-2 grid-cols-1">
        {datas?.map(items => (
          <div key={items?._id} onClick={() => handileClickData(items?._id)}>
            <div
              onClick={() => document.getElementById('my_modal_5').showModal()}
              className="shadow-lg bg-green-200 rounded-lg cursor-pointer  p-6"
            >
              <h2>{items?.description}</h2>
              <div className="flex justify-between mt-3">
                <h2 className="flex items-center">
                  {items?.coins}{' '}
                  <CiCoinInsert className="text-2xl text-orange-400"></CiCoinInsert>{' '}
                </h2>
                <h2>{items?.price} usd</h2>
              </div>
              <p className="mt-4">{items?.purchase_description}</p>

              {/* Open the modal using document.getElementById('ID').showModal() method */}

              <dialog
                id="my_modal_5"
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box">
                  <h2 className="text-2xl mb-4 font-bold text-center text-green-400">
                    Stripe payment gateway
                  </h2>
                  <p className="">
                    Welcome to our Payment gateway, where your convenience and
                    security are our top priorities. We've streamlined the
                    process to ensure you can complete your transactions swiftly
                    and safely.
                  </p>
                  <p className="my-3">date : {payment_time}</p>
                  <p className="font-semibold mb-3">{priceData?.description}</p>
                  <Elements stripe={stripePromise}>
                    {/* chekout form */}
                    <CheckoutForm priceData={priceData}></CheckoutForm>
                  </Elements>
                </div>
              </dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseCoin;
