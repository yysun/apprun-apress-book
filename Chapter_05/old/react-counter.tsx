import app from 'apprun'
import React from 'react';
import { render } from 'react-dom';
class App extends React.Component {
  state = { count: 0 }

  increment = () => {
    this.setState({
      count: this.state.count + 1
    });
  }

  decrement = () => {
    this.setState({
      count: this.state.count - 1
    });
  }

  render() {
    return <div>
      <h1>{this.state.count}</h1>
      <button onClick={this.decrement}>-</button>
      <button onClick={this.increment}>+</button>
    </div>
  }
}

render(<App />, document.getElementById('root'));