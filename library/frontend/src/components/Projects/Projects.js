import React from 'react'

export function Projects({projects}) {

  return (
    <table className={'table'}>
      <thead>
      <tr>
        <th>Id</th>
        <th>Title</th>
        <th>Link</th>
      </tr>
      </thead>
      <tbody>
      {projects.map((item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.title}</td>
          <td>{item.link}</td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}