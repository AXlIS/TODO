import React, {useState} from 'react'

export const tokenContext = React.createContext({})

export function TokenContextProvider({children}) {
  const [token, setToken] = useState('')


  return (
    <tokenContext.Provider value={{
      value: token,
      onChange: setToken
    }}>
      {children}
    </tokenContext.Provider>
  )
}