import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTaskCountBasedOnStatus } from '../../services/taskApisCall';

function Dashboard() {

  const { tasks } = useSelector((state) => state.task);
  const { token } = useSelector((state) => state.user);
  const [totalTaskCount, setTotalTaskCount] = useState({
    "Inprogress": 0,
    "Finished": 0,
    "Not_Started": 0
  })

  const [loading, setLoading] = useState(false);


  const dispatch = useDispatch();



  useEffect(() => {

    const getTaskCount = async (token) => {
      try {
        // console.log("token", token);
        setLoading(true);
        let taskCounts = await getTaskCountBasedOnStatus(token);
        // console.log("taskCounts............", taskCounts?.data?.data);
      } catch (error) {
        console.log("error occured at the time of fetching all tasks : ", error);
      }
      finally {
        setLoading(false);
      }
    }

    let taskcount = getTaskCount(token);
    setTotalTaskCount(taskcount);
  }, [])

  console.log("Total counts: ", totalTaskCount);

  if (loading) {
    return <p>Loading....</p>
  }
  else {
    return (
      <div>

        <div className="grid sm:grid-cols-4 gap-2">

          {/* all */}
          <div className="bg-white rounded-2xl  flex flex-col justify-center px-2 py-3">
            <p>Total Task</p>

            <p>
              <span>
                {/* {totalTaskCount.Inprogress + totalTaskCount.Finished + totalTaskCount.Not_Started} */}
                1
              </span>
            </p>

          </div>

          {/* all */}
          <div className="bg-white rounded-2xl  flex flex-col justify-center px-2 py-3">
            <p>Total Task</p>

            <p>
              <span>
                {/* {totalTaskCount.Inprogress + totalTaskCount.Finished + totalTaskCount.Not_Started} */}
                1
              </span>
            </p>

          </div>

          {/* all */}
          <div className="bg-white rounded-2xl  flex flex-col justify-center px-2 py-3">
            <p>Total Task</p>

            <p>
              <span>
                {/* {totalTaskCount.Inprogress + totalTaskCount.Finished + totalTaskCount.Not_Started} */}
                1
              </span>
            </p>

          </div>

          {/* all */}
          <div className="bg-white rounded-2xl  flex flex-col justify-center px-2 py-3">
            <p>Total Task</p>

            <p>
              <span>
                {/* {totalTaskCount.Inprogress + totalTaskCount.Finished + totalTaskCount.Not_Started} */}
                1
              </span>
            </p>

          </div>

        </div>
        
      </div>
    )
  }
}

export default Dashboard