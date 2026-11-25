import TaskItem from "./TaskItem";

function TaskList({ tasks, toggleTask, deleteTask }) {
  return (
    <>
      <h2>My Tasks ({tasks.length})</h2>

      {tasks.length === 0 && (
        <p>No tasks yet. Add your first task!</p>
      )}

      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      ))}
    </>
  );
}

export default TaskList;