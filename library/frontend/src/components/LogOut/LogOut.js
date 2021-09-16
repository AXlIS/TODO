import React from 'react'
import './logout.css'

export function LogOut() {

  function handleClick() {
    localStorage.removeItem('token')
    window.location.reload()
  }

  return (
    <li className={"logout"} onClick={handleClick}>Log Out</li>
  )
}