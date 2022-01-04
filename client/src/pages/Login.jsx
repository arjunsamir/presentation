import { useState, useContext } from "react"
import Input from "../components/Input"
import AppContext from "../store/AppContext"

const Login = () => {

  const { state, update } = useContext(AppContext);

  return (
    <section className="login">
      <div className="login__container">
        {state.role === "host" ? 
          <>
            <h1 className="login__title">Hello Arjun, you know what to do.</h1>
          </>
         :
          <>
            <h1 className="login__title">Hello, please enter your access code to get started.</h1>
            <Input
              id="accessCode"
              label="Access Code"
              placeholder="quantum-chakras"
              value={state.code}
              onChange={code => update("code", code)}
            />
          </>
        }
      </div>
    </section>
  )

}


export default Login