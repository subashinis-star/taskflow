import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import LoginImage from "./components/LoginImage";
import LoginPanel from "./components/LoginPanel";
import Dashboard from "./components/Dashboard";
const API = "https://taskflow-api-muvn.onrender.com/api";

const getToken = () => localStorage.getItem("token");

function App() {
  const toggleRegister = () => {
  setIsRegister((previous) => !previous);
  setMessage("");
};
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(!!getToken());
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");

  const auth = {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  };

  const loadTasks = async () => {
    try {
      const response = await axios.get(`${API}/tasks`, auth);
      setTasks(response.data);
    } catch (error) {
      setMessage("Please log in again.");
      setLoggedIn(false);
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    if (loggedIn) {
      loadTasks();
    }
  }, [loggedIn]);

  const handleAuth = async (e) => {
    e.preventDefault();

    try {
      const route = isRegister ? "register" : "login";

      const response = await axios.post(`${API}/${route}`, {
        username,
        password
      });

      if (isRegister) {
        setIsRegister(false);
        setMessage("Registration successful. Please log in.");
      } else {
        localStorage.setItem("token", response.data.token);
        setLoggedIn(true);
        setMessage("");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong."
      );
    }
  };

  const addTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    await axios.post(`${API}/tasks`, { title }, auth);
    setTitle("");
    loadTasks();
  };

  const toggleTask = async (task) => {
    await axios.put(
      `${API}/tasks/${task.id}`,
      { completed: !task.completed },
      auth
    );

    loadTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`, auth);
    loadTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setTasks([]);
  };

  if (!loggedIn) {
  return (
    <main className="auth-page">
      <div className="auth-layout">
        <LoginImage />

        <LoginPanel
          isRegister={isRegister}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleAuth={handleAuth}
          toggleRegister={toggleRegister}
          message={message}
        />
      </div>
    </main>
  );
}

  return (
    <Dashboard
      logout={logout}
      title={title}
      setTitle={setTitle}
      addTask={addTask}
      tasks={tasks}
      toggleTask={toggleTask}
      deleteTask={deleteTask}
    />
  );
}

export default App;