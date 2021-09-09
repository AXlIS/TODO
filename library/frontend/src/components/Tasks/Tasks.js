import React, {useEffect, useState} from "react";
import axios from "axios";
import {API_BASE_URL} from "../Users";

export function Tasks(){
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}tasks/`)
      .then((response) => {
        const data = response.data.results.map((item) => {
          return {
            text: item.text,
            status: item.status
          }
        })
        setTasks(data)
      })
  }, [])

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
        <tr>
          <td>{item.text}</td>
          <td>{item.status}</td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}