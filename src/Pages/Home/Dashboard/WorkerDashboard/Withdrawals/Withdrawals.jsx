import { useForm } from 'react-hook-form';

const Withdrawals = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    console.log(data);
    const { withDraw_coin } = data;
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
              <div className="input flex items-center input-bordered border-green-300">
                <input
                  type="text"
                  placeholder="Coin To WithDraw
"
                  className=""
                  required
                  {...register('withDraw_coin', { required: true })}
                />
                <button className="p-1 font-semibold">Max</button>
              </div>
            </div>
            <div className="form-control w-1/2">
              <div className="input grid items-center input-bordered border-green-300">
                <p>
                  Withdraw amount: <span className="font-bold">20</span>$
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 my-3 mt-6">
            <div className="form-control w-full">
              <select className="select select-accent w-full ">
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
