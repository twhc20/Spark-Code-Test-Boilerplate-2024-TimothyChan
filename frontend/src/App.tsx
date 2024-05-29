import React, { useEffect, useState } from 'react';
import './App.css';
import Todo, { TodoType } from './Todo';

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false); // Used to refresh the todo list
  const [form, setForm] = useState({title: '', description: ''}) // Used to store the form data

  // Initially fetch todo 
  // Added refresh state to refresh the todo list after adding a new todo
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await fetch('http://localhost:8080/');
        if (todos.status !== 200) {
          console.log('Error fetching data');
          return;
        }

        setTodos(await todos.json());
      } catch (e) {
        console.log('Could not connect to server. Ensure it is running. ' + e);
      }
    }

    fetchTodos()
  }, [refresh]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page reload

    // Trim the form data
    var title = form.title.trim();
    var description = form.description.trim();
    // If title OR description is empty, return and do not add the todo
    // Could argue that description can be empty, but for this example, we will require it as specifed in the yaml file
    if (title === '' || description === '') {
      console.log('Error adding todo: invalid input');
      return;
    }

    // put the form data into a newTodo object
    var newTodo = { title: form.title, description: form.description };

    // Send POST request to server
    try {
      const response = await fetch('http://localhost:8080/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });

      if (response.status === 200) { // If todo added successfully
        console.log ('Todo added successfully');
        setRefresh(!refresh); // Refresh the todo list
        setForm({title: '', description: ''}); // Clear the form
        return;
      } else if (response.status === 400){ // If invalid input
        console.log('Error adding todo: invalid input');
        return;
      }
      else { // all other cases
        console.log('Error adding todo');
        return;
      }

    } catch (e) {
      console.log('Could not connect to server. Ensure it is running. ' + e);
    }

  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>TODO</h1>
      </header>

      <div className="todo-list">
        {todos.map((todo) =>
          <Todo
            key={todo.title + todo.description}
            title={todo.title}
            description={todo.description}
          />
        )}
      </div>

      <h2>Add a Todo</h2>
      <form onSubmit={handleSubmit}>
        <input 
        placeholder="Title" 
        name="title" 
        autoFocus={true}
        value={form.title}
        onChange={e => setForm({...form, title: e.target.value})}
        />
        <input 
        placeholder="Description" 
        name="description" 
        value={form.description}
        onChange={e => setForm({...form, description: e.target.value})}
        />
        <button>Add Todo</button>
      </form>
    </div>
  );
}

export default App;
