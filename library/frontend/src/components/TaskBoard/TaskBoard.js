import React from 'react'
import "./taskboard.css"
import {TaskBoardGroup} from "../TaskBoardGroup/TaskBoardGroup";

export function TaskBoard({backlog, processing, done, basket}) {
  return (
    <section className={"taskboard"}>
      <TaskBoardGroup tasks={backlog} title={"Бэклог"} id={"backlog"}/>
      <TaskBoardGroup tasks={processing} title={"В процессе"} id={"processing"}/>
      <TaskBoardGroup tasks={done} title={"Готово"} id={"done"}/>
      <TaskBoardGroup tasks={basket} title={"Корзина"} id={"basket"}/>
    </section>
  )
}