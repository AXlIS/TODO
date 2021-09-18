import React, {useContext} from 'react'
import './logout.css'
import {stateContext} from "../../context/stateContext";

export function LogOut() {
  const {setToken} = useContext(stateContext)

  function handleClick() {
    localStorage.removeItem('token')
    setToken()
    // window.location.reload()
  }

  return (
    <li className={"logout"} onClick={handleClick}><nobr>Log Out</nobr></li>
  )
}