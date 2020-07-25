import React, { Component } from 'react';
import './App.css';
import TextField from './TextField';
import NavBar from './NavBar';

// class App extends Component {
//   state = {  }
//   render() { 
//     return (  );
//   }
// }
 
// export default App;

class App extends Component {

  render() {
    return (
      
    <div className="App">
      <div className="App-Component">
          <h1><NavBar/></h1>
          <TextField />
      </div>
    </div>
     );
    }
}

export default App;
