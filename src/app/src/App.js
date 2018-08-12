import React, { Component } from 'react';

import {
  NavBar,
  Form
} from './components'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
          <div style={{paddingTop: 20}} className="container-fluid mw-100">
            <Form />
          </div>
      </div>
    );
  }
}

export default App;
