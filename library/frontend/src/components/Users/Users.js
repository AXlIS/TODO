import React from "react";
import './users.css'

export function Users({users}) {

  function click(event){
    console.log(event)
  }

  return (
      <table className={'table'} onClick={click}>
        <tbody>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Email</th>
        </tr>
        {users.map((item) => (
            <tr key={item.url}>
              <td>{item.username}</td>
              <td>{item.status}</td>
              <td>{item.email}</td>
            </tr>
        ))}
        </tbody>
      </table>
  )
}
