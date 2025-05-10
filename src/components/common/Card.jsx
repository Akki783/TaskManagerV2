function Card({ task, handleOnDelete, handleOnEdit,handleStatusChange }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg m-5 w-fit">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{task.title}</h2>
        <span className="text-sm text-gray-500">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </div>

      <p className="text-gray-600">{task.description}</p>

      <div className="flex items-center gap-3 mt-3">
        <img
          src={task.assignedBy?.image}
          alt={task.assignedBy?.firstName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">
            Assigned By: {task.assignedBy?.firstName} {task.assignedBy?.lastName}
          </p>
          <p className="text-sm text-gray-500">{task.assignedBy?.email}</p>
        </div>
      </div>

      <div className="mt-5">
        <p className="font-semibold mb-2">Assigned Users:</p>
        <div className="flex flex-col gap-3">
          {task.users.map(({ user, permission }) => (
            <div key={user._id} className="flex items-center gap-2 bg-gray-100 p-2 rounded-md">
              <img
                src={user.image}
                alt={user.firstName}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="text-sm">
                <p className="font-medium">{user.firstName} {user.lastName}</p>
                <p className="text-gray-500">Permission: {permission}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full cursor-pointer"
        onClick={()=>{handleStatusChange(task._id)}}>
          {task.status}
        </button>

        <div className="flex gap-x-2">
          <button
            className='bg-green-400 p-2 text-white rounded-2xl'
            onClick={() => handleOnEdit(task)}
          >
            Edit
          </button>
          <button
            className='bg-red-400 p-2 text-white rounded-full'
            onClick={() => handleOnDelete(task._id)}
          >
            {/* <MdDelete /> */}
            delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
