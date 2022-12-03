import React from 'react'
import axios from 'axios';
import { ThemeProvider } from 'styled-components';
import Form from './Form';
import TodoList from './TodoList';

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
          <TodoList 
            toggleCompleted={this.toggleCompleted}
            todos={this.state.todos}
          />
          <div>
          <Form 
            handleSubmit={this.handleSubmit}
            input={this.input}
            handleChange={this.handleChange}
            handleClear ={this.handleClear}
          />
          </div>
      </div>
    )
  }
}