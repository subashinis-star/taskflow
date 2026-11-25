function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <div className="task">
      <span className={task.completed ? "completed" : ""}>
        {task.title}
      </span>

      <div>
        <button onClick={() => toggleTask(task)}>
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button
          className="delete"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;