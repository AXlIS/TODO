import React from "react";
import {AuthForm} from "../AuthForm/AuthForm";
import "./auth.css"

export function AuthPage(){

  return (
    <main className={'auth'}>
        <AuthForm/>
    </main>
  )
}