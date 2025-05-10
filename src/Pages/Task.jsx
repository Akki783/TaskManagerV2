import React, { useEffect, useState } from 'react';
import { createTask, deleteTaskByID, fetchTask } from '../services/taskApisCall';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, setTasks } from '../Store/Slices/task';
import Card from '../components/common/Card';
import Modal from '../components/common/Modal';
import { useForm } from 'react-hook-form';
import { getUsers } from '../services/UserApiCall';
import { setUserList } from '../Store/Slices/user';
import toast from 'react-hot-toast';

function Task() {
  const { token, user } = useSelector((state) => state.user);
  const { tasks } = useSelector((state) => state.task);
  // const { user } = useSelector((state) =>) state.uswe;
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const { register, handleSubmit, formState: { errors }, getValues, setValue, reset } = useForm();

  const getTaskList = async () => {
    try {
      let res = await fetchTask(token);
      dispatch(setTasks(res?.data?.tasks));
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    getTaskList();

    const fetchUsers = async () => {
      let res = await getUsers(token);
      dispatch(setUserList(res?.data?.usersList));
    };
    fetchUsers();
  }, []);

  const handleStatusChange = async (taskId) => {
    try {
      // const res = await updateTask(token, taskId, { status: newStatus });
      // dispatch(updateTaskInState(res.data.task));
      console.log("update task.............", taskId);

    } catch (error) {
      console.error("Error updating status:", error);
    }
  };


  const onSubmit = async (data) => {
    try {
      if (editTask) {
        // editing existing task
        // let res = await updateTask(token, editTask._id, {
        //   title: data.title,
        //   description: data.description,
        //   dueDate: data.due_date,
        //   assignedTo: data.assignedTo,
        // });
        // dispatch(updateTaskInState(res.data.task));

        console.log("data on edit............", data);

      } else {
        // creating new task
        console.log("Creating task........", data)


        let res = await createTask(token, {
          title: data.title,
          description: data.description,
          dueDate: data.due_date,
          assignedTo: data.assignedTo,
        });


        dispatch(addTask(res.data.task));
      }
    } catch (error) {
      console.log("Error submitting task:", error);
    } finally {
      setOpenModal(false);
      setEditTask(null);
      reset();
    }
  };

  const handleOnEdit = (task) => {
    console.log("task.........................................", task.users);
    console.log("user slice.........................................", user);

    let taskAssignToUser = task.users.filter((u) => {
      if (u?.user?._id === user?._id) {
        return u;
      }
      // console.log("users............",u?.user);
    });

    console.log("taskAssignToUser.............", taskAssignToUser);

    if (taskAssignToUser.length === 0) {
      console.log("taskAssignToUser length.............", taskAssignToUser.length);
      toast.error("This task is not assigned to you");
      setOpenModal(false);
      setEditTask(null);
      return;
    }

    if (task?.assignedBy?._id !== user?._id || taskAssignToUser?.permission === "edit") {
      setEditTask(task);
      setOpenModal(true);
      setValue("title", task.title);
      setValue("description", task.description);
      setValue("due_date", task.dueDate ? task.dueDate.split("T")[0] : ""); // format date for input
      const prefillPermissions = task.users.map(({ user, permission }) => ({
        userId: user._id,
        userLabel: user.email,
        permission,
      }));
      setValue("assignedTo", prefillPermissions);
    }
    else {
      setOpenModal(false);
      setEditTask(null);
      toast.error("You dont have access to edit this task...");
    }

  };

  const handleOnDelete = async (_id) => {
    try {
      let delete_data = await deleteTaskByID({ taskId: _id }, token);
      console.log("Delete Data.........", delete_data);
      if (delete_data?.success) {
        dispatch(deleteTask(_id));
      }
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className='text-xl font-semibold'>Tasks</h1>
        <button
          className='px-4 py-2 font-semibold rounded-md text-white bg-blue-500 hover:shadow-lg'
          onClick={() => {
            setEditTask(null);
            reset();
            setOpenModal(true);
          }}
        >
          Create Task
        </button>
      </div>

      <div className='flex flex-wrap'>
        {tasks.map((task) => (
          <Card
            key={task._id}
            task={task}
            handleOnDelete={handleOnDelete}
            handleOnEdit={handleOnEdit}
            handleStatusChange={handleStatusChange}
          />

        ))}
      </div>

      {openModal && (
        <Modal
          {...{
            register,
            handleSubmit,
            formState: { errors },
            getValues,
            setOpenModal,
            setValue,
            onSubmit,
            isEditing: !!editTask,
          }}
        />
      )}
    </div>
  );
}

export default Task;
