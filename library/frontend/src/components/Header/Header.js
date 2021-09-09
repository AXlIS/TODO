import React from 'react'
import {Link} from "react-router-dom";
import './header.css'

export default function Header() {
  return (
      <header className={"header"}>
        <div className={"header_block"}>
          <h1 className={"header_text"}>TODO</h1>
        </div>
        <nav>
          <ul className={"navbar"}>
            <li className={"navbar_item"}>
              <Link className={'navbar_item_link'} to={'/users'}>Пользователи</Link>
            </li>
            <li className={"navbar_item"}>
              <Link className={'navbar_item_link'} to={'/projects'}>Проекты</Link>
            </li>
            <li className={"navbar_item"}>
              <Link className={'navbar_item_link'} to={'/tasks'}>Задания</Link>
            </li>
          </ul>
        </nav>
      </header>
  )
}
