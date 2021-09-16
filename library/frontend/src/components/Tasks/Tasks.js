import React from "react";
import './tasks.css'

export function Tasks({tasks}){

  return (
    <table className={'table'}>
      <thead>
      <tr>
        <th>Text</th>
        <th>Status</th>
      </tr>
      </thead>
      <tbody>
      {tasks.map((item) => (
        <tr key={item.id}>
          <td>{item.text}</td>
          <td>{item.status}</td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}