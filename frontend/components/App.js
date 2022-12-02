import React from 'react'
import axios from 'axios';
import { ThemeProvider } from 'styled-components';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {

  state = {
    todos: [],
  }

  getTodos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({ ...this.state, todos: res.data.data})
    })
    .catch(err => {
      console.error(err);
    })
  }

  componentDidMount() {
    this.getTodos()
  }

  render() {
    return (
      <div>
        <h1>Todos Checklist:</h1>
        
          {
            this.state.todos.map(todo => {
              return <li key={todo.id}>{todo.name}</li>
            })
          }
        
        <input type='text' placeholder='Type Todo Here' />
        <input type='submit' />
        <button>Clear Completed</button>
      </div>
    )
  }
}
