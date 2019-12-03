import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

export default function App() {
  useEffect(() => {
    getData();
  }, []);

  function getData() {
    const token = process.env.REACT_APP_WEATHER_ACCESS_KEY;
    const city = "London";
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${token}`
      )
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errorData: err.message }));
  }

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

// class App extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       greeting: "hi"
//     };

//     this.getData = this.getData.bind(this);
//   }

//   componentDidMount() {
//     this.getData();
//   }

//   getData() {
//     const token = process.env.REACT_APP_WEATHER_ACCESS_KEY;
//     const city = "London";
//     axios
//       .get(
//         `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${token}`
//       )
//       .then(res => console.log(res.data))
//       .catch(err => this.setState({ errorData: err.message }));
//   }

//   render() {
//     return (
//       <div>
//         <h1>{this.state.greeting}</h1>
//       </div>
//     );
//   }
// }

// ReactDOM.render(<App />, document.getElementById("root"));

//`api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${token}`
