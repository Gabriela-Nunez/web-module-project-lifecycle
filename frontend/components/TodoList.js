import React from 'react';
import Todo from './Todo';

export default class TodoList extends React.Component {
  render() {
    return (
      <>
        <h1>Todos Checklist:</h1>
      {
        this.props.todos.map(todo => {
          return <Todo todo={todo} key={todo.id} toggleCompleted={this.props.toggleCompleted} />
        })
      }  

      </>
    )
  }
}
