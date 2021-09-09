import React, {useEffect, useState} from 'react'
import axios from "axios";
import {API_BASE_URL} from "../Users";

export function Projects() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}projects/`)
      .then((response) => {
        const data = response.data.results.map((item) => {
          return {
            title: item.title,
            link: item.link
          }
        })
        setProjects(data)
      })
  }, [])

  return (
    <table className={'table'}>
      <thead>
      <tr>
        <th>Title</th>
        <th>Link</th>
      </tr>
      </thead>
      <tbody>
      {projects.map((item) => (
        <tr>
          <td>{item.title}</td>
          <td>{item.link}</td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}