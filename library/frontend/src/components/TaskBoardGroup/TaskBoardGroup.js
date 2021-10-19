import React, {useContext} from 'react'
import "./taskboardgroup.css"
import classNames from "classnames";
import {TaskList} from "../TaskList/TaskList";
import {stateContext} from "../../context/stateContext";
import axios from "axios";
import {API_BASE_URL} from "../../config";

export function TaskBoardGroup({title, id, tasks}) {
  let titleClasses = classNames({
      "taskboard__group__title": true,
      [`taskboard__group__title--${id}`]: true,
    }
  )

  const {state, onChange} = useContext(stateContext)

  function clearBasket() {
    onChange({
      columns: {
        ...state.columns,
        basket: []
      }
    })

    axios
      .delete(`${API_BASE_URL}/clear/`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${state.token}`
        },
        params: {
          project: state.project
        }
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <article className={"taskboard__group"}>
      <h3 className={titleClasses}>{title}</h3>
      <TaskList id={id} tasks={tasks}/>
      {id === 'basket' && tasks.length !== 0 && (
        <button className={'taskboard__button button button--clear'} onClick={clearBasket}>
          <span>Очистить</span>
        </button>
      )}
    </article>
  )
}