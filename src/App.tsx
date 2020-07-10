import React, { useState, Fragment } from 'react';
import './App.css';

type FormElem = React.FormEvent<HTMLFormElement>

interface ITodo {
  text: string,
  complete: boolean
}

const App = () => {
  const [value, setValue] = useState<string>('')
  const [todos, setTodos] = useState<ITodo[]>([])

  const handleSubmit = (e: FormElem):void => {
    e.preventDefault()
    addTodo(value)
    setValue('')
  }

  const addTodo = (text: string):void => {
    const newTodos: ITodo[] = [...todos, {text, complete: false}]
    setTodos(newTodos)
  }

  const completeTodo = (index: number):void => {
    const newTodos: ITodo[] = [...todos]
    newTodos[index].complete = !newTodos[index].complete
    setTodos(newTodos)
  }

  const removeTodo = (index:number):void => {
    const newTodos: ITodo[] = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  return (
    <div className="App">
      <Fragment>
        <h1>Todo App List</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={value} 
            onChange={(e) => setValue(e.target.value)} 
          />
          <button className="btn" type='submit'>Add Todo</button>
        </form>
        <section>
          {todos.map((todo: ITodo, index: number) => (
            <Fragment>
              <div key={index}>
                <div style={{ textDecoration: todo.complete ? 'line-through' : ''}}>{todo.text}</div>
                <button 
                  className="btn" 
                  type='button' 
                  onClick={() => completeTodo(index)}>
                  {' '}
                  {todo.complete ? 'Incomplete' : 'Complete'}
                  {' '}
                </button>
                <button type="button" onClick={() => removeTodo(index)}>&times;</button>
              </div>
            </Fragment>
          ))}
        </section>
      </Fragment>
    </div>
  );
}

export default App;
