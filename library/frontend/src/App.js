import React from 'react';
import {Users} from "./components/Users/Users";
import axios from 'axios'
import {API_BASE_URL} from "./components/Users";
import {Route} from 'react-router-dom'
import './App.css';
import {Projects} from "./components/Projects/Projects";
import {Tasks} from "./components/Tasks/Tasks";


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
        this.setState({'users': response.data.results})
      })
      .then(error => console.log(error))
  }

  render() {
    return (
      <main>
        <Route exact path={['/', '/users']}>
          <Users users={this.state.users}/>
        </Route>
        <Route path={'/projects'}>
           <Projects/>
        </Route>
        <Route exact path={'/tasks'}>
          <Tasks/>
        </Route>

      </main>
    )
  }
}

export default App;
