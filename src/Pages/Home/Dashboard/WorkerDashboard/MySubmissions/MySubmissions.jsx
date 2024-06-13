import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../../Hooks/useAuth';
import { BiSolidCoinStack } from 'react-icons/bi';
import useAxiosSecure from '../../../../../Hooks/AxiosSecure/useAxiosSecure';
import { useEffect, useState } from 'react';

const MySubmissions = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loding } = useAuth();
  const [itemPages, setItemsPages] = useState(7);
  const [curreentPages, setCureentPages] = useState(1);
  const [counts, setCounts] = useState(0);
  console.log(counts);
  const { data } = useQuery({
    queryKey: ['submissions', user?.email, curreentPages, itemPages],
    enabled: !loding && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/my-submission?worker_email=${user?.email}&page=${
          curreentPages - 1
        }&size=${itemPages}`
      );

      return data;
    },
  });

  useEffect(() => {
    axiosSecure.get(`/submentCount?email=${user?.email}`).then(res => {
      setCounts(res.data);
    });
  }, []);

  const numberOfPages = Math.ceil(counts?.length / itemPages);
  let pages = [];
  for (let i = 0; i < numberOfPages; i++) {
    pages.push(i + 1);
  }
  const handileItemPage = e => {
    console.log(e.target.value);
    const vale = parseInt(e.target.value);
    setItemsPages(vale);
    setCureentPages(1);
  };
  const handileClikPrev = () => {
    if (curreentPages > 1) {
      setCureentPages(curreentPages - 1);
    }
  };
  const handileClickNext = () => {
    if (curreentPages < pages?.length) {
      setCureentPages(curreentPages + 1);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-green-400 font-semibold text-white ">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Title</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          {data?.map((item, index) => (
            <tbody key={item._id}>
              {/* row 1 */}
              <tr>
                <th>{index + 1}</th>
                <td>{item?.worker_name}</td>
                <td>{item?.task_title}</td>
                <td>{item?.worker_email}</td>
                <td className="flex  font-bold items-center ">
                  {item?.payable_amount}{' '}
                  <BiSolidCoinStack className="text-xl text-orange-400" />
                </td>
                <td>{item?.current_time}</td>
                <td>
                  <p
                    className={
                      (item.status == 'approve' &&
                        'bg-[#dbf6fa] text-[#00796b] btn rounded-full') ||
                      (item.status == 'pending' &&
                        'bg-[#fff9c4] text-[#ff8c00] btn rounded-full') ||
                      (item.status == 'reject' &&
                        'bg-[#ffcccc] text-[#8b0000] btn rounded-full')
                    }
                  >
                    {item?.status}
                  </p>{' '}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>

      <div className="justify-center flex gap-4 mt-12">
        <button onClick={handileClikPrev} className="btn ">
          Prev
        </button>
        {pages?.map(item => (
          <button
            onClick={() => setCureentPages(item)}
            className={
              curreentPages === item
                ? 'bg-green-500 font-semibold btn'
                : 'btn font-semibold '
            }
            key={item}
          >
            {item}{' '}
          </button>
        ))}
        <button onClick={handileClickNext} className="btn">
          Next
        </button>
        <select value={itemPages} onChange={handileItemPage} name="" id="">
          <option value="5">5</option>
          <option value="7">7</option>
          <option value="9">9</option>
          <option value="11">11</option>
        </select>
      </div>
    </div>
  );
};

export default MySubmissions;
