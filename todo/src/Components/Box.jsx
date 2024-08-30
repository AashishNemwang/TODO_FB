import React, { useState } from 'react';

const Box = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Not Started');
    const [isEditing, setIsEditing] = useState(false);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
    const [error, setError] = useState('');

    const addTask = () => {
        if (title.trim() === '' || description.trim() === '') {
            setError('Task name and description are required.');
            return;
        }

        const newTask = {
            title,
            description,
            status,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString(),
        };

        setTasks([...tasks, newTask]);
        resetForm();
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setStatus('Not Started');
        setIsEditing(false);
        setCurrentTaskIndex(null);
        setError(''); // Clear the error message
    };

    const editTask = (index) => {
        const task = tasks[index];
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
        setIsEditing(true);
        setCurrentTaskIndex(index);
        setError(''); // Clear the error message
    };

    const updateTask = () => {
        if (title.trim() === '' || description.trim() === '') {
            setError('Task name and description are required.');
            return;
        }

        const updatedTasks = tasks.map((task, index) =>
            index === currentTaskIndex
                ? {
                    ...task,
                    title,
                    description,
                    status,
                    updatedAt: new Date().toLocaleString(),
                }
                : task
        );
        setTasks(updatedTasks);
        resetForm();
    };

    const deleteTask = (index) => {
        const filteredTasks = tasks.filter((_, i) => i !== index);
        setTasks(filteredTasks);
    };

    const markAsDone = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, status: 'Done', updatedAt: new Date().toLocaleString() } : task
        );
        setTasks(updatedTasks);
    };

    return (
        <div className="bg-gray-100 flex flex-row min-h-screen p-4">
            {/* Input Section */}
            <div className="bg-white p-6 rounded shadow-lg w-1/4">
                <h1 className="text-2xl font-bold text-center mb-4">{isEditing ? 'Edit Task' : 'Add Task'}</h1>
                <input
                    type="text"
                    className="border p-2 mb-4 w-full"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="border p-2 mb-4 w-full h-32 resize-none overflow-hidden"
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select
                    className="border p-2 mb-4 w-full"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option>Not Started</option>
                    <option>In Progress</option>
                    <option>Done</option>
                </select>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                    onClick={isEditing ? updateTask : addTask}
                >
                    {isEditing ? 'Update Task' : 'Add Task'}
                </button>
            </div>

            {/* Task Display Section */}
            <div className="bg-white p-6 rounded shadow-lg w-3/4 ml-8">
                <h2 className="text-2xl font-bold text-center mb-4">Tasks</h2>
                {tasks.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                        {tasks.map((task, index) => (
                            <div key={index} className="bg-gray-100 p-4 rounded shadow-lg">
                                <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
                                <p className="text-sm leading-5 mb-2">{task.description}</p>
                                <p className="text-sm mb-2">Status: {task.status}</p>
                                <p className="text-sm mb-2">Created At: {task.createdAt}</p>
                                <p className="text-sm mb-2">Updated At: {task.updatedAt}</p>
                                <div className="flex justify-between mt-4">
                                    <button
                                        className="text-yellow-700 font-semibold"
                                        onClick={() => markAsDone(index)}
                                    >
                                        Done
                                    </button>
                                    <button
                                        className="text-red-600 font-semibold"
                                        onClick={() => deleteTask(index)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="text-blue-600 font-semibold"
                                        onClick={() => editTask(index)}
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No tasks added yet.</p>
                )}
            </div>
        </div>
    );
};

export default Box;
 