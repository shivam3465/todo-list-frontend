import React, { useContext, useEffect, useState } from "react";
import "./home.scss";
import Todo from "../../components/todo/Todo.jsx";
import { Navigate } from "react-router-dom";
import { context } from "../..";
import axios from "axios";
import { baseUrl } from "../../App";
import Spinner from "../../components/spinner/Spinner";
import { toast } from "react-toastify";

export default function Home() {
  const { authenticated } = useContext(context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/task/all`, { withCredentials: true })
      .then(({ data }) => {
        setTasks(data.tasks);
      })
      .catch((err) => console.error(err));      
  }, []);

  const addtask = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${baseUrl}/task/add`,
        { title, desc },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success("Task added successfully");      
      setTasks((arr) => [
        ...arr,
        { title, desc, _id: data.id, completed: false },
      ]);
      setLoading(() => false);
      setTitle("");
      setDesc("");
    } catch (error) {
      console.log(error);
      toast.error("Fill all the fields ");
      setLoading(() => false);
    }
  };

  window.onkeydown = (e) => {
    if (e.key === "Enter") addtask();
  };

  if (!authenticated) return <Navigate to={"/login"} />;  
  return (
    <div id="home">
      {loading ? (
        <Spinner color={"rgb(96, 96, 96)"} />
      ) : (
        <section id="add-task">
          <div id="input-container">
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="write title here ... "
              required
            />
            <input
              type="text"
              onChange={(e) => setDesc(e.target.value)}
              placeholder="write discription here ... "
              required
            />
          </div>
          <button className="btn" id="input-submit" onClick={addtask}>
            Submit
          </button>
        </section>
      )}

      <section id="show-task">
        {tasks?.map((item, i) => {
          return <Todo task={item} key={i} />;
        })}
      </section>
    </div>
  );
}
