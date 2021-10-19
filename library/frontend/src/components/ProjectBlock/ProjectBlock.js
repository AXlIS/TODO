import React, {useContext, useState} from 'react'
import "./projectblock.css"
import axios from "axios";
import {API_BASE_URL} from "../../config";
import {stateContext} from "../../context/stateContext";

export function ProjectsBlock({handleChange}) {

  const {state, token, onChange} = useContext(stateContext)
  const [text, setText] = useState('')

  function addTask(event) {
    event.preventDefault()
    event.stopPropagation()
    axios
      .post(`${API_BASE_URL}/tasks/`, {
        "text": text,
        "project": state.project,
        "creating_user": state.user.id
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        }
      })
      .then((response) => {
        let tasks = state.columns.backlog
        tasks.push(response.data)
        onChange({columns: {
          ...state.columns,
            backlog: tasks,
          }})
        setText('')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function change(event) {
    setText(event.target.value)
  }

  return (
    <section className={'project_block'}>
      <div className={"project_block_title"}>
        <h2>Мои проекты</h2>
      </div>
      <div>
        <select className={'project_form_select'} onChange={handleChange}>
          <option value={0}>Выберете проект:</option>
          {state.projects.map((item) => (
            <option value={item.id} key={item.id}>{item.title}</option>
          ))}
        </select>
      </div>
      <form className={"project_form"}>
        <div>
          <label htmlFor={"add_task"} className={"project_form_label"}/>
          <input required id={"add_task"} name={"add_task"} type={"text"}
                 className={"add_task_input"} placeholder={"Добавить новую задачу: "} value={text} onChange={change}/>
        </div>
        <div>
          <button className={"project_form_button"} onClick={addTask}>
            + Add
          </button>
        </div>
      </form>
    </section>
  )
}