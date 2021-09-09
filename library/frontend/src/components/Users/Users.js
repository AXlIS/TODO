import React from "react";
import './users.css'

export function Users({users}) {
  return (
    <table className={'table'}>
      <thead>
      <tr>
        <th>Name</th>
        <th>Status</th>
        <th>Email</th>
      </tr>
      </thead>
      <tbody>
      {users.map((item) => (
        <tr key={item.id}>
          <td>{item.username}</td>
          <td>{item.status}</td>
          <td>{item.email}</td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}
