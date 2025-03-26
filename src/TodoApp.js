import { useState, useEffect } from "react";
import "./TodoApp.css";

function TodoApp() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const [task, setTask] = useState("");

    function addTask() {
        if (task.trim() === "") return;
        setTasks([...tasks, { text: task, completed: false }]);
        setTask("");
    }

    function removeTask(index) {
        setTasks(tasks.filter((_, i) => i !== index));
    }

    function toggleTask(index) {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
    }

    return (
        <div className="todo-container">
            <h2>To-Do List ✅</h2>

            <div className="input-container">
                <input type="text" placeholder="Enter task..." value={task} onChange={(e) => setTask(e.target.value)} />
                <button onClick={addTask}>Add</button>
            </div>

            <ul>
                {tasks.map((t, index) => (
                    <li key={index} style={{ textDecoration: t.completed ? "line-through" : "none" }}>
                        <input type="checkbox" checked={t.completed} onChange={() => toggleTask(index)} />
                        {t.text}
                        <button className="delete-btn" onClick={() => removeTask(index)}>
                            ❌
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoApp;
