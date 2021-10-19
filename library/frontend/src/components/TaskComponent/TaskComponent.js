import React from 'react'
import "./taskcomponent.css"
import classNames from "classnames";
import {Draggable} from 'react-beautiful-dnd'

export function TaskComponent({id, index, task}) {
  let taskClasses = classNames({
    "taskboard__item": true,
    "task": true,
    [`task--${id}`]: true,
  })

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{...provided.draggableProps.style}}
            className={taskClasses}>
            <p className={"taskboard__item__text"}>
              {task.text}
            </p>
          </div>)
      }}
    </Draggable>

  )
}