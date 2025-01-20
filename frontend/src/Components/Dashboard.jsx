import React, { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { format } from "date-fns";

export default function Dashboard() {


  const [userInfo, setUserInfo] = useState(null);
  const [allTask, setAllTask] = useState([]);
  const [addTask, setAddTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    createdOn: format(new Date(), 'yyyy-MM-dd'),
  });
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate()


  // Fetching user information
  const getUserInfo = async () => {
    try {
      const res = await axiosInstance.get("/getUser");
      if (res.data && res.data.user) {
        setUserInfo(res.data.user);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.clear();
        navigate('/login')
      }
    }
  };

  // Fetching all tasks
  const getAllTask = async () => {
    try {
      const res = await axiosInstance.get("/getAllTask");
      if (res.data) {
        setAllTask(res.data.tasks || []);
      }
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  //Adding New Tasks

  const handleAddTask = (e) => {
    setAddTask((task) => ({
      ...task,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNewTask = async (e) => {
    e.preventDefault();
    const btn = document.getElementById('close')
 
    try {
      let res;
      if (editId !== null) {
        res = await axiosInstance.put(`editTask/${editId}`, addTask);
       
        btn.click()
        setEditId(null);
        if (res.data && res.data.task) {
          getAllTask();
          toast("Task Is Updated");

          setAddTask({
            title: "",
            description: "",
            status: "Pending",
            createdOn: format(new Date(), 'yyyy-MM-dd')
          });
        }
      } else {
        res = await axiosInstance.post("/addTask", addTask);
        if (res.data && res.data.task) {
          btn.click()
          getAllTask();
          toast("Task Is Added");
          setAddTask({
            title: "",
            description: "",
            status: "Pending",
            createdOn: format(new Date(), 'yyyy-MM-dd')
          });
        }
      }
    } catch (err) {
      alert(err.response.data.message);
      
    }
  };


  //Fetching

  useEffect(() => {
    getUserInfo();
    getAllTask();
  }, []);


  //Delete Task

  const deleteTask = async (id) => {
    try {
      const res = await axiosInstance.delete(`/deleteTask/${id}`);
      if (res.data && !res.data.error) {
        getAllTask();
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  //Update Task

  const updateTask = (id) => {
    const task = allTask.find((task) => task._id === id);
    setAddTask(task);
    setEditId(id);
  };

  return (
    <>
    
      <Navbar userInfo={userInfo || {}} />

      <>
        <button
          type="button"
          className="btn btn-primary mt-5 mx-3"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          data-bs-whatever="@mdo"
        >
          Add New Task
        </button>
        <ToastContainer />
        <div className="container mt-5">
          <h2 className="text-center mb-4">Your Tasks</h2>

          <div className="row">
            {allTask.map((task, index) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                key={index}
              >
                <div className="card h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{task.title || "Task Title"}</h5>
                    <p className="card-text">
                      {task.description || "Task Description"}
                    </p>
                    <p className="card-text">
                      Status : {task.status || "Task Status"}
                    </p>
                    <p className="card-text">{task.createdOn || "Date"}</p>

                    <div className="mt-auto">
                      <button
                        type="button"
                        className="btn btn-primary me-2"
                        data-bs-toggle='modal'
                        data-bs-target="#exampleModal"
                        data-bs-whatever="@mdo"
                        onClick={() => updateTask(task._id)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger "
                        onClick={() => deleteTask(task._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    {editId ? "Update Task" : "Add Task"}
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="date">Date</label>{" "}
                      <input
                        type="date"
                        name="createdOn"
                        value={addTask.createdOn}
                        className="form-control"
                        id="date"
                        onChange={handleAddTask}
                      />
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={addTask.title}
                        className="form-control"
                        id="recipient-name"
                        onChange={handleAddTask}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message-text" className="col-form-label">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={addTask.description}
                        className="form-control"
                        id="message-text"
                        onChange={handleAddTask}
                      />
                      <label htmlFor="status" className="col-form-label">
                        Status
                      </label>
                      <select
                        name="status"
                        value={addTask.status}
                        className="form-select"
                        aria-label="Default select example"
                        onChange={handleAddTask}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Fullfilled">Fulfilled</option>
                      </select>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    id='close'
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleNewTask}
                    className="btn btn-primary"
                  >
                    {editId ? "Update" : "Add Task"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      </>
    </>
  );
}
