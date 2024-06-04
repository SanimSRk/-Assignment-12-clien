import { FaCoins } from 'react-icons/fa6';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { Link } from 'react-router-dom';

const TasksCard = ({ item }) => {
  const {
    task_title,
    task_image,
    creator_name,
    task_quantity,
    payable_amount,
    completion_date,
    _id,
  } = item;

  // const handileClickDeatiles = () => {

  // }
  return (
    <div className="shadow-lg rounded-lg p-4 group ">
      <div>
        <img
          className="object-cover 
                cursor-pointer
                group-hover:scale-110
                transition rounded-lg"
          src={task_image}
          alt=""
        />
      </div>

      <h2 className="text-xl font-semibold text-green-500 mt-3">
        {task_title}
      </h2>
      <div className="flex justify-between mt-3">
        <p>{creator_name}</p>
        <p className="flex gap-2 items-center">
          {task_quantity}
          <MdOutlineProductionQuantityLimits className="text-2xl" />
        </p>
      </div>
      <div className="flex justify-between mt-3">
        <p>{completion_date}</p>
        <p className="flex items-center gap-2 text-orange-400 font-bold">
          {payable_amount} <FaCoins className="text-2xl"></FaCoins>
        </p>
      </div>

      <Link to={`/dashboard/tasksDeatils/${_id}`}>
        <button className="bg-green-400 mt-6 text-white btn w-full">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default TasksCard;
