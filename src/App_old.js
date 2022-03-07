import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component {
  
    
    state = {
      name: 'Priscila Bottaro',
      counter: 0
    }
  

  handlePClick() {
    this.setState({ name: 'Priscila Alavarce'});
  }

  handleAClick = (event) => {
    event.preventDefault();
    const { counter } = this.state;
    const nextCounter = counter + 1;
    this.setState({ counter: counter + 1})
  }

  render() {
    const { name } = this.state;
    const { counter } = this.state;
    return(
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={this.handlePClick}>
          {name} {counter}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          onClick={this.handleAClick}
        >
          Link aqui
        </a>
      </header>
    </div>
    )
  }
}

export default App;
