import React from 'react';
import {Users} from "./components/Users/Users";
import axios from 'axios'
import {API_BASE_URL} from "./config";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import './App.css';
import {Projects} from "./components/Projects/Projects";
import {Tasks} from "./components/Tasks/Tasks";
import Header from "./components/Header/Header";
import {AuthPage} from "./components/Auth/Auth";
import {stateContext} from "./context/stateContext";
import {NotFound} from "./components/NotFound/NotFound";


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
          <Switch>
            <Route exact path={'/auth'}>
              <AuthPage/>
            </Route>
            <Route exact path={'/notFound'}>
              <NotFound/>
            </Route>
            <Route path={'/main'}>
              <main>
                {!this.isAuthorized() && (<div className={"main-fail"}>
                  <h2>Эта страница доступна только после авторизации</h2>
                </div>)}
                {this.isAuthorized() && (
                  <span>
                    <Switch>
                      <Route exact path={['/main', '/main/users']}>
                        <Users users={this.state.users}/>
                      </Route>
                      <Route exact path={'/main/projects'}>
                        <Projects projects={this.state.projects}/>
                      </Route>
                      <Route exact path={'/main/tasks'}>
                        <Tasks tasks={this.state.tasks}/>
                      </Route>
                      <Redirect from='/main/' to='/notFound'/>
                    </Switch>
                  </span>
                )}
              </main>
            </Route>
            <Redirect exact from='/' to='/main'/>
            <Redirect from='*' to='/notFound'/>
          </Switch>
        </BrowserRouter>
      </stateContext.Provider>
    )
  }
}

export default App;
