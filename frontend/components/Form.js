import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <>
        <form onSubmit={this.props.handleSubmit}>
          <input value={this.props.input} type='text' placeholder='Type Todo Here' onChange={this.props.handleChange}></input>
          <input type='submit'></input> 
        </form>
        <button onClick={this.props.handleClear}>Clear Completed</button>
    </>
    )
  }
}
