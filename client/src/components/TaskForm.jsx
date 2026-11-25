function TaskForm({ title, setTitle, addTask }) {
  return (
    <form onSubmit={addTask}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Enter a new task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;