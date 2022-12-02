import React from 'react'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Todos Checklist</h1>
        
          <li>1</li>
          <li>2</li>
        
        <input placeholder='todo goes here' />
        <button>Add</button>
        <button>Clear Completed Todo</button>
      </div>
    )
  }
}
