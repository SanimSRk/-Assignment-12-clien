import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useUser from '../../../../../Hooks/useUser';
import { toast } from 'react-toastify';
import useAuth from '../../../../../Hooks/useAuth';
import useAxiosPublice from '../../../../../Hooks/AxiosPublic/useAxiosPublice';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../../Hooks/AxiosSecure/useAxiosSecure';

const Withdrawals = () => {
  const [withdraw_coin, setWithdraw_coin] = useState(0);
  const { data: amounts, refetch } = useUser();
  const { user } = useAuth();
  const axiosPublice = useAxiosPublice();
  const axiosSecure = useAxiosSecure();
  const worker_email = user?.email;
  const worker_name = user?.displayName;
  let withdraw_time = new Date();
  let dd = withdraw_time.getDate();
  let mm = withdraw_time.getMonth() + 1;
  let yyyy = withdraw_time.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  withdraw_time = dd + '/' + mm + '/' + yyyy;

  const handileClickCoins = e => {
    setWithdraw_coin(e);
  };
  // const handileClickMax = () => {
  //   const payment = 300 < 300;
  //   console.log(payment);
  // };

  const withdraw_amount = withdraw_coin / 20;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    const { numbers, payments } = data;
    const withdrawInfo = {
      withdraw_coin: parseFloat(withdraw_coin),
      numbers,
      withdraw_amount: parseFloat(withdraw_amount),
      payments,
      worker_email,
      worker_name,
      withdraw_time,
    };
    const userWithdrawInfo = {
      withdraw_coin: parseFloat(withdraw_coin),
    };
    if (amounts?.coin < withdraw_coin) {
      return toast.error('Sorry your coins not available for withdrawal!');
    } else if (withdraw_coin > 300) {
      return toast.error(
        'Were sorry, but the maximum 300 amount you can withdraw coins.'
      );
    } else {
      console.log(withdrawInfo);
      axiosSecure.post('/withdraw-requests', withdrawInfo).then(res => {
        if (res.data.insertedId) {
          axiosSecure
            .patch(
              `/withdrawUser-decrease?email=${user?.email}`,
              userWithdrawInfo
            )
            .then(res => {
              if (res.data.modifiedCount) {
                Swal.fire({
                  position: 'top-center',
                  icon: 'success',
                  title: 'Suscess fully withdraw request',
                  showConfirmButton: false,
                  timer: 1500,
                });
                refetch();
              }
            });
        }
      });
    }
  };
  return (
    <div>
      <div className=" lg:w-2/3 border-2 border-green-300 mx-auto py-8 px-6 my-[80px] shadow-lg lg:py-[60px] lg:px-[80px]">
        <h2 className="text-3xl font-bold text-center gap-0 ">
          <span className="text-green-400">With</span>Draw Amount
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-8">
            <p className="input input-bordered border-green-300 grid items-center text-xl font-semibold">
              Maximum WithDraw Amount : 15$
            </p>
          </div>
          <div className="flex gap-4 my-3 mt-5">
            <div className="form-control w-1/2">
              <input
                type="text"
                placeholder="Coin To WithDraw
"
                onChange={e => handileClickCoins(e.target.value)}
                name="withDraw_coin"
                className="input flex items-center input-bordered border-green-300"
                required
              />
            </div>
            <div className="form-control w-1/2">
              <div className="input grid items-center input-bordered border-green-300">
                <p>
                  Withdraw amount:{' '}
                  <span className="font-bold">{withdraw_amount}</span>$
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 my-3 mt-6">
            <div className="form-control w-full">
              <select
                className="select select-accent w-full "
                {...register('payments', { required: true })}
              >
                <option disabled selected>
                  Select Payment System
                </option>

                <option> Bkash</option>
                <option> Rocket</option>
                <option> Nagad</option>
              </select>
            </div>
          </div>

          <div className="form-control w-full mt-2">
            <label className="label">
              <span className="label-text">Account Number</span>
            </label>
            <input
              type="number"
              className="input input-bordered border-green-300"
              name=""
              id=""
              {...register('numbers', { required: true })}
            />
          </div>
          <input
            className="text-white btn w-full mt-6 bg-green-400"
            type="submit"
            value="WithDraw Now"
          />
        </form>
      </div>
    </div>
  );
};

export default Withdrawals;
