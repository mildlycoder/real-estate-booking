import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";

export const UserContext = createContext({})

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null)
    useEffect(()=>{
        axios.get('/profile').then(({data}) => {
            setUser(data)
        } )
    }, [])
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}