import React from 'react';
import {Users} from "./components/Users/Users";
import axios from 'axios'
import {API_BASE_URL} from "./config";
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'users': [],
    };
  }

  componentDidMount() {
    axios
        .get(`${API_BASE_URL}users/`)
        .then(response => {
          this.setState({'users': response.data})
        })
        .then(error => console.log(error))
  }


  render() {
    return (
        <main>
          <Users users={this.state.users}/>
        </main>
    )
  }

}


export default App;
