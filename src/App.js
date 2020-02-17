import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    minutes: 1,
    seconds: 0
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state;

      if(seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1
        }))
      }

      if(seconds <= 0) {
        if(minutes <= 0) {
          console.log('End');
          clearInterval(this.myInterval)
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59
          }))
        }
      }
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.myInterval)
  }

  changeMinutesHandler = (e) => {
    if(this.state.minutes === undefined) {
      this.setState({ minutes: 0 })
    }
    this.setState({ minutes: e.target.value })
  }

  changeSecondsHandler = (e) => {
    if(this.state.seconds === undefined) {
      this.setState({ seconds: 0 })
    }
    this.setState({ seconds: e.target.value })
  }

  render() {

    const { minutes, seconds } = this.state;

    return (
      <div className="App">
        <label>Minutes </label>
        <input
          type="number"
          onChange={this.changeMinutesHandler}
        />
        <br />
        <label>Seconds </label>
        <input
          type="number"
          onChange={this.changeSecondsHandler}
        />
        {
          minutes <= 0 && seconds <= 0
          ? <h1>BUSTED!</h1>
          : <h1>Time Remaining: { minutes } : { seconds < 10 ? `0${ seconds }` : seconds } </h1>
        }
      </div>
    );
  }
}

export default App;
