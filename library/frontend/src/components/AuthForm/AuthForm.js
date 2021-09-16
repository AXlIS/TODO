import React, {useState} from "react";
import "./authform.css"
import axios from "axios";
import {API_BASE_URL} from "../../config";
import {useHistory} from "react-router-dom";

export function AuthForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState(false)

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
        history.push('/')
        localStorage.setItem('token', response.data.token)
        window.location.reload()
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

      {success && (<div className={"success"}>
        <h4>Вы успешно авторизированы</h4>
      </div>)}

      {fail && (<div className={"fail"}>
        <h4>Не верный логин или пароль</h4>
      </div>)}

      <form className={"auth_form"} method={"POST"} onChange={handleChange} onSubmit={getToken}>
        <div>
          <div>
            <label htmlFor={"username"} className={"auth-form-label"}/>
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