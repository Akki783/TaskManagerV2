import axios from "axios";
import toast from "react-hot-toast";

async function fetchTask(token) {
  try {

    const baseUrl = import.meta.env.VITE_DOMAIN_URL + "task";

    const tasks = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Fetch tasks............", tasks);

    return tasks;


  } catch (error) {
    console.log("Error occured while fetching tasks.....", error);
  }
}

async function getTaskCountBasedOnStatus(token) {
  try {

    const baseUrl = import.meta.env.VITE_DOMAIN_URL + "task/count";

    const tasks = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Fetch tasks count............", tasks);
    return tasks;


  } catch (error) {
    console.log("Error occured while fetching tasks.....", error);
  }
}

async function createTask(token, body) {
  try {

    const baseUrl = import.meta.env.VITE_DOMAIN_URL + "task/create-task";

    console.log("token.......................", token);

    const tasks = await axios.post(baseUrl, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("create tasks............", tasks);

    toast.success("Task Created Successfully....");
    return tasks;

  } catch (error) {
    console.log("Error occured while creating tasks.....", error);
    toast.error(error.message || "Task Creation Failed....")
  }
}

async function deleteTaskByID(body,token) {
  try {

    const baseUrl = import.meta.env.VITE_DOMAIN_URL + "task/delete-task";

    console.log("deleting task......token.......................", token);

    const tasks = await axios.delete(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: body
    });

    console.log("Deleted tasks............", tasks);

    toast.success("Task deleted Successfully....");
    return tasks;

  } catch (error) {
    console.log("Error occured while deleting tasks.....", error);
    toast.error("You dont have access to delete this task....")
  }
}

export { fetchTask, getTaskCountBasedOnStatus, createTask, deleteTaskByID };