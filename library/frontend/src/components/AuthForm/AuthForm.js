import React, {useContext, useState} from "react";
import "./authform.css"
import axios from "axios";
import {API_BASE_URL} from "../../config";
import {useHistory} from "react-router-dom";
import {stateContext} from "../../context/stateContext";

export function AuthForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fail, setFail] = useState(false)
  const {onChange, setToken} = useContext(stateContext)

  const history = useHistory()

  function handleChange(event) {
    event.target.name === 'username' ? setUsername(event.target.value) : setPassword(event.target.value)
  }

  function getToken(event) {
    axios.post(`${API_BASE_URL}-token/`, {
      "username": username,
      "password": password,
    })
      .then((response) => {

        localStorage.setItem('token', response.data.token)
        onChange({token: response.data.token}, setToken)
        history.push('/')
      })
      .catch((error) => {
        setFail(true)
        setTimeout(() => {
          setFail(false)
        }, 5000)
        console.log(error)
      })
    event.preventDefault()
  }

  return (
    <div className={'auth_block'}>
      <div className={"auth_block_title"}>
        <h2>Sign in to your account</h2>
        <span>or <a href={"/#"}>you can register</a></span>
      </div>

      {fail && (<div className={"fail"}>
        <h4>Не верный логин или пароль</h4>
      </div>)}

      <form className={"auth_form"} method={"POST"} onChange={handleChange} onSubmit={getToken}>
        <div>
          <div>
            <label htmlFor={"username"} className={"auth_form_label"}/>
            <input required id={"username"} name={"username"} type={"text"} value={username}
                   className={"email"} placeholder={"Email address"}/>
          </div>
          <div>
            <label htmlFor={"password"} className={"auth-form-label"}/>
            <input required id={"password"} name={"password"} type={"password"} value={password}
                   className={"password"} placeholder={"Password"}/>
          </div>
        </div>
        <div>
          <button className={"submit_button"}>
            Sign in
          </button>
        </div>
      </form>
    </div>

  )
}