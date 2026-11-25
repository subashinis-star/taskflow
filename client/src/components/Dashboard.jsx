import Header from "./Header";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function Dashboard({
  logout,
  title,
  setTitle,
  addTask,
  tasks,
  toggleTask,
  deleteTask
}) {
  return (
    <div className="app">
      <div className="container">
        <Header onLogout={logout} />

        <p className="subtitle">
          Organise your day. Achieve more.
        </p>

        <TaskForm
          title={title}
          setTitle={setTitle}
          addTask={addTask}
        />

        <TaskList
          tasks={tasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
}

export default Dashboard;