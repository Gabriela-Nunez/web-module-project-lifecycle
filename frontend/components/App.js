import React from 'react'
import axios from 'axios';
import { ThemeProvider } from 'styled-components';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {

  state = {
    todos: [],
    input: '',
    error: ''
  }

  getTodos = () => {
      axios.get(URL)
      .then(res => {
        this.setState({ ...this.state, todos: res.data.data})
      })
      .catch(err => {
        this.setState({ ...this.state, error:err.response.data.message})
      })
  }

  postNewTodo = () => {
    axios.post(URL, { name: this.state.input })
      .then(res => {
        this.getTodos();
        this.setState({ ...this.state, input: ''})
      })
      .catch(err => {
        this.setState({ ...this.state, error:err.response.data.message})
      })
  }

  componentDidMount() {
    this.getTodos()
  }

  handleChange = (e) => {
    const { value } = e.target
    this.setState({...this.state, input: value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.postNewTodo()
  }

  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({ ...this.state, todos: this.state.todos.map(todo => {
          if (todo.id !== id) return todo;
          return res.data.data
        })})
      })
      .catch(err => {
        this.setState({ ...this.state, error:err.response.data.message})
      })
  }

  handleClear = () => {
    this.setState({ ...this.state, todos: this.state.todos.filter(todo => {
      return (todo.completed === false);
    }) })
  }

  render() {
    return (
      <div>
        <h1>Todos Checklist:</h1>
        
          {
            this.state.todos.map(todo => {
              return <li onClick={this.toggleCompleted(todo.id)}  key={todo.id}>{todo.name} {todo.completed ? '✅' : ''}</li>
            })
          }
          <div>
            <form onSubmit={this.handleSubmit}>
              <input value={this.state.input} type='text' placeholder='Type Todo Here' onChange={this.handleChange}></input>
              <input type='submit'></input> 
            </form>
            <button onClick={this.handleClear}>Clear Completed</button>
          </div>
      </div>
    )
  }
}