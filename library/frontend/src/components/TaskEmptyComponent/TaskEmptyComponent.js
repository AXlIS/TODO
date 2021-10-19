import React from 'react'
import "./taskemptycomponent.css"

export function TaskEmptyComponent() {
  return (
    <div className={'taskboard__item task task--empty'}>
      <p>
        Перетащите карточку
      </p>
    </div>
  )
}