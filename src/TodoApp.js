import { useState, useEffect } from "react";
import axios from "axios";  // Import axios
import "./TodoApp.css";

const API_URL = "https://todo-backend-kxrz.onrender.com/api/todos";  // Backend URL

function TodoApp() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");

    // Fetch tasks from backend
    useEffect(() => {
        axios.get(API_URL)
            .then(res => setTasks(res.data))
            .catch(err => console.error(err));
    }, []);

    // Add Task
    function addTask() {
        if (task.trim() === "") return;
        axios.post(API_URL, { text: task })
            .then(res => setTasks([...tasks, res.data]))
            .catch(err => console.error(err));
        setTask("");
    }

    // Remove Task
    function removeTask(id) {
        axios.delete(`${API_URL}/${id}`)
            .then(() => setTasks(tasks.filter(task => task._id !== id)))
            .catch(err => console.error(err));
    }

    // Toggle Task Completion
    function toggleTask(id) {
        const updatedTask = tasks.find(task => task._id === id);
        axios.put(`${API_URL}/${id}`, { completed: !updatedTask.completed })
            .then(res => {
                setTasks(tasks.map(task =>
                    task._id === id ? res.data : task
                ));
            })
            .catch(err => console.error(err));
    }

    return (
        <div className="todo-container">
            <h2>To-Do List ✅</h2>

            <div className="input-container">
                <input type="text" placeholder="Enter task..." value={task} onChange={(e) => setTask(e.target.value)} />
                <button onClick={addTask}>Add</button>
            </div>

            <ul>
                {tasks.map((t) => (
                    <li key={t._id} style={{ textDecoration: t.completed ? "line-through" : "none" }}>
                        <input type="checkbox" checked={t.completed} onChange={() => toggleTask(t._id)} />
                        {t.text}
                        <button className="delete-btn" onClick={() => removeTask(t._id)}>
                            ❌
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoApp;
