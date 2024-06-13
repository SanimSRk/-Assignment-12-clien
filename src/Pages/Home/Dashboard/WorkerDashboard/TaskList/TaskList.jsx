import { useQuery } from '@tanstack/react-query';

import TasksCard from './TasksCard';
import useAxiosSecure from '../../../../../Hooks/AxiosSecure/useAxiosSecure';

const TaskList = () => {
  const axiosSecure = useAxiosSecure();
  const { data } = useQuery({
    queryKey: ['show-tasks'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/tasks-list');

      return data;
    },
  });

  return (
    <div>
      <div className=" lg:w-3/4 md:w-3/4 mx-auto text-center">
        <h2 className="text-3xl font-bold text-green-400">TaskList</h2>
        <p>
          The Task Section serves to methodically outline and oversee the tasks
          or activities essential for accomplishing a project or attaining a
          specific objective. It offers an exhaustive breakdown of each task,
          furnishing relevant details and resources to guarantee lucid
          communication and efficient task management.
        </p>
      </div>
      <div className="grid grid-cols-1 mt-12 lg:grid-cols-3 md:grid-cols-2 gap-6">
        {data?.map(item => (
          <TasksCard key={item._id} item={item}></TasksCard>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
