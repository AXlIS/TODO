import React from 'react';
import axios from 'axios'
import {API_BASE_URL} from "./config";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import './App.css';
import {DragDropContext} from 'react-beautiful-dnd'
import Header from "./components/Header/Header";
import {AuthPage} from "./components/Auth/Auth";
import {stateContext} from "./context/stateContext";
import {NotFound} from "./components/NotFound/NotFound";
import {ProjectsBlock} from "./components/ProjectBlock/ProjectBlock";
import {TaskBoard} from "./components/TaskBoard/TaskBoard";


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      users: [],
      projects: [],
      columns: {
        backlog: [],
        processing: [],
        done: [],
        basket: [],
      },
      token: '',
      project: null,
      task: '',
    };

    this.getData = this.getData.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getTasks = this.getTasks.bind(this)
  }

  isAuthorized() {
    return !!this.state.token
  }

  getUserInfo() {
    axios
      .get('http://127.0.0.1:8000/api/user/', {
        headers: this.getHeaders()
      })
      .then(response => {
        this.setState({"user": response.data, "projects": response.data.projects})
      })
      .catch(error => {
        console.log(error)
      })
  }

  getData() {

    axios
      .get('http://127.0.0.1:8000/api/users/', {
        headers: this.getHeaders()
      })
      .then(response => {
        this.setState({'users': response.data.results})
      })
      .catch(error => console.log(error))

    axios
      .get(`${API_BASE_URL}/projects/`, {
        headers: this.getHeaders()
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
        headers: this.getHeaders()
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

  getHeaders() {
    return {
      "Content-Type": "application/json",
      "Authorization": `Token ${this.state.token}`
    }
  }

  getTasks() {
    if (this.state.project) {
      axios
        .get(`${API_BASE_URL}/projects/${this.state.project}/`, {
          headers: this.getHeaders()
        })
        .then((response) => {
          const tasks = response.data.tasks
          this.setState({
            columns: {
              backlog: tasks.filter((item) => item.status === 'backlog'),
              processing: tasks.filter((item) => item.status === 'processing'),
              done: tasks.filter((item) => item.status === 'done'),
              basket: tasks.filter((item) => item.status === 'basket'),
            }
          })
        })
    }
  }

  setToken() {
    const token = localStorage.getItem('token')

    if (token) {
      this.setState({'token': token}, () => {
        // this.getData()
        this.getUserInfo()
      })
    } else {
      this.setState({
        'user': {},
        'users': [],
        'project': null,
        'projects': [],
        'tasks': [],
        columns: {
          backlog: [],
          processing: [],
          done: [],
          basket: [],
        },
        'token': '',
      })
    }
  }

  componentDidMount() {
    this.setToken()
  }

  handleChange(event) {
    if (parseInt(event.target.value)) {
      this.setState({"project": parseInt(event.target.value)}, () => {
        this.getTasks()
      })
    }
  }

  changeTaskStatus(task, status) {
    axios
      .put(`${API_BASE_URL}/tasks/${task.id}/`, {
        ...task,
        status: status
      }, {
        headers: this.getHeaders()
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  onDragEnd(result) {
    const {source, destination} = result

    if (!destination) return;

    if (source.droppableId !== destination.droppableId) {
      const sourceItems = this.state.columns[source.droppableId]
      const destItems = this.state.columns[destination.droppableId]
      const [removed] = sourceItems.splice(source.index, 1)
      destItems.splice(destination.index, 0, removed)
      this.setState({
        columns: {
          ...this.state.columns,
          [source.droppableId]: sourceItems,
          [destination.droppableId]: destItems
        }
      })
      this.changeTaskStatus(removed, destination.droppableId)
    } else {
      const copiedItems = this.state.columns[source.droppableId]
      const [removed] = copiedItems.splice(source.index, 1)
      copiedItems.splice(destination.index, 0, removed);
      this.setState({
        columns: {
          ...this.state.columns,
          [source.droppableId]: copiedItems
        }
      })
    }
  }

  render() {
    return (
      <stateContext.Provider value={{
        state: this.state,
        token: this.state.token,
        onChange: (value, callback = () => {
        }) => this.setState(value, callback),
        setToken: () => this.setToken(),
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
                  <h2>Для просмотра задач необходима авторизация</h2>
                </div>)}
                {this.isAuthorized() && (
                  <ProjectsBlock handleChange={(event) => this.handleChange(event)} getTasks={() => this.getTasks()}/>
                )}
                {this.state.project &&
                <DragDropContext onDragEnd={(result) => this.onDragEnd(result)}>
                  <TaskBoard backlog={this.state.columns.backlog}
                             processing={this.state.columns.processing}
                             done={this.state.columns.done}
                             basket={this.state.columns.basket}/>
                </DragDropContext>
                }
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
