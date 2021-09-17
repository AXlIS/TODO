import React from 'react';
import {Users} from "./components/Users/Users";
import axios from 'axios'
import {API_BASE_URL} from "./config";
import {BrowserRouter, Route} from 'react-router-dom'
import './App.css';
import {Projects} from "./components/Projects/Projects";
import {Tasks} from "./components/Tasks/Tasks";
import Header from "./components/Header/Header";
import {AuthPage} from "./components/Auth/Auth";
import {stateContext} from "./context/stateContext";


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      'users': [],
      'projects': [],
      'tasks': [],
      'token': '',
    };
    this.getData = this.getData.bind(this)
  }

  isAuthorized() {
    return !!this.state.token
  }

  getData() {

    axios
      .get('http://127.0.0.1:8000/api/users/', {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${this.state.token}`
          }
        }
      )
      .then(response => {
        this.setState({'users': response.data.results})
      })
      .catch(error => console.log(error))

    axios
      .get(`${API_BASE_URL}/projects/`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${this.state.token}`
        }
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
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${this.state.token}`
        }
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
      this.setState({'token': token}, () => {
        this.getData()
      })
    } else {
      this.setState({
        'users': [],
        'projects': [],
        'tasks': [],
        'token': '',
      })
    }
  }

  componentDidMount() {
    this.setToken()
  }

  render() {
    return (
      <stateContext.Provider value={{
        value: this.state,
        onChange: (value, callback = () => {
        }) => this.setState(value, callback),
        setToken: () => this.setToken()
      }}>
        <BrowserRouter>
          <Header login={this.isAuthorized()}/>
          <Route exact path={['/', '/users', '/projects', '/tasks']}>
            <main>
              {!this.isAuthorized() && (<div className={"main-fail"}>
                <h2>Эта страница доступна только после авторизации</h2>
              </div>)}
              {this.isAuthorized() && (
                <span>
                  <Route exact path={['/', '/users']}>
                    <Users users={this.state.users}/>
                  </Route>
                  <Route path={'/projects'}>
                    <Projects projects={this.state.projects}/>
                  </Route>
                  <Route exact path={'/tasks'}>
                    <Tasks tasks={this.state.tasks}/>
                  </Route>
                </span>
              )}
            </main>
          </Route>
          <Route path={'/auth'}>
            <AuthPage/>
          </Route>
        </BrowserRouter>
      </stateContext.Provider>
    )
  }
}

export default App;
