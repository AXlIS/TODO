import React from 'react'
import "./tasklist.css"
import {TaskComponent} from "../TaskComponent/TaskComponent";
import {Droppable} from "react-beautiful-dnd";
import {TaskEmptyComponent} from "../TaskEmptyComponent/TaskEmptyComponent";

export function TaskList({id, tasks}) {
  function isEmpty() {
    return !tasks.length
  }

  // function isNotBasket(){
  //   console.log()
  //   return id !== 'basket' && tasks.length === 0
  // }


  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={"taskboard__list"}>
            {isEmpty() && (
              <TaskEmptyComponent/>
            )}
            {tasks?.map((item, index) => (
              <TaskComponent id={id} key={item.id} index={index} task={item}/>
            ))}
            {provided.placeholder}
          </div>
        )
      }}
    </Droppable>
  )
}