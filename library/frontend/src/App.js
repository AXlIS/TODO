import React from 'react';
import {Users} from "./components/Users/Users";
import axios from 'axios'
import {API_BASE_URL} from "./config";
import {Route} from 'react-router-dom'
import './App.css';
import {Projects} from "./components/Projects/Projects";
import {Tasks} from "./components/Tasks/Tasks";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'users': [],
      'projects': [],
      'tasks': [],
      'token': ''
    };
  }

  getData() {
    axios
      .get(`${API_BASE_URL}/users/`, {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.state.token}`
      })
      .then(response => {
        this.setState({'users': response.data.results})
      })
      .catch(error => console.log(error))
    // .then(() => {console.log(this.state)})

    axios
      .get(`${API_BASE_URL}/projects/`, {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.state.token}`
      })
      .then((response) => {
        const data = response.data.results.map((item) => {
          return {
            id: item.id,
            title: item.title,
            link: item.link
          }
        })
        this.setState({'projects': data})
      })
      .catch(console.log)
    // .then(() => {console.log(this.state)})

    axios
      .get(`${API_BASE_URL}/tasks/`, {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.state.token}`
      })
      .then((response) => {
        const data = response.data.results.map((item) => {
          return {
            id: item.id,
            text: item.text,
            status: item.status
          }
        })
        this.setState({'tasks': data})
      })
      .catch(console.log)
    // .then(() => {console.log(this.state)})
  }

  setToken() {
    const token = localStorage.getItem('token')
    if (token) {
      this.setState({'token': token})
      this.getData()
    }
  }

  componentDidMount() {
    this.setToken()

  }

  render() {
    return (
      <main>
        {!this.state.token && (<div className={"main-fail"}>
          <h2>Эта страница доступна только после авторизации</h2>
        </div>)}

        {this.state.token &&
        (<span>
          <Route exact path={['/', '/users']}>
            <Users users={this.state.users}/>
          </Route>
          <Route path={'/projects'}>
            <Projects projects={this.state.projects}/>
          </Route>
          <Route exact path={'/tasks'}>
            <Tasks tasks={this.state.tasks}/>
          </Route>
        </span>)
        }
      </main>
    )
  }
}

export default App;
