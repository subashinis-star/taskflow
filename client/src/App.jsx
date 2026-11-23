
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";


const API = "https://taskflow-api-muvn.onrender.com/api";
const getToken = () => localStorage.getItem("token");

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(!!getToken());
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");

  const auth = {
    headers: { Authorization: `Bearer ${getToken()}` }
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
    if (loggedIn) loadTasks();
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
      setMessage(error.response?.data?.message || "Something went wrong.");
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
    await axios.put(`${API}/tasks/${task.id}`, {
      completed: !task.completed
    }, auth);
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
      <div className="app">
        <div className="container">
          <h1>TaskFlow</h1>
          <h2>{isRegister ? "Create Account" : "Login"}</h2>
          <form onSubmit={handleAuth}>
            <input placeholder="Username" value={username}
              onChange={e => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password (8+ characters)"
              value={password} onChange={e => setPassword(e.target.value)}
              required minLength={8} />
            <button type="submit">
              {isRegister ? "Register" : "Login"}
            </button>
          </form>
          <button onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Go to Login" : "Create Account"}
          </button>
          <p>{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        <h1>TaskFlow</h1>
        <p className="subtitle">Organise your day. Achieve more.</p>
        <button onClick={logout}>Logout</button>
        <form onSubmit={addTask}>
          <input value={title} onChange={e => setTitle(e.target.value)}
            placeholder="Enter a new task..." />
          <button type="submit">Add Task</button>
        </form>
        <h2>My Tasks ({tasks.length})</h2>
        {tasks.length === 0 && <p>No tasks yet. Add your first task!</p>}
        {tasks.map(task => (
          <div className="task" key={task.id}>
            <span className={task.completed ? "completed" : ""}>
              {task.title}
            </span>
            <div>
              <button onClick={() => toggleTask(task)}>
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button className="delete"
                onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
