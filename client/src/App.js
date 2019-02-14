import React, { Component } from 'react'
import './App.css'
import { subscribeToTimer } from './api'

class App extends Component {
  constructor(props) {
    super(props)

    subscribeToTimer(timestamp => {
      this.setState({
        timestamp
      })
    })
  }

  state = { timestamp: 'No timestamp set yet' }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Drawing App</h2>
          <p>Current server timestamp is {this.state.timestamp}</p>
        </div>
      </div>
    )
  }
}

export default App
