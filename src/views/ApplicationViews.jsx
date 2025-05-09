import { useEffect, useState } from "react"
import { UserViews } from "./UserViews"
import { AdminViews } from "./AdminViews"

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})
  
  useEffect(() => {
    const localReaderUser = localStorage.getItem("reader_user")
    const readerUserObject = JSON.parse(localReaderUser)
  
    setCurrentUser(readerUserObject)
  }, [])
  
    return currentUser.isAdmin ? (<AdminViews currentUser={currentUser} /> 
  
    ):  (
    <UserViews currentUser={currentUser}/>
    )
  }