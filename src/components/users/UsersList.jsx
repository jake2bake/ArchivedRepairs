import { useEffect, useState } from "react"
import { getAllUsers } from "../../services/UserServices"
import { User } from "./User"
import "./UsersList.css"

export const UsersList = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllUsers().then((usersArray) => {
            setUsers(usersArray)
        })
    }, [])

    return (
        <div>
            <article className="users">
                {users.map((userObj) => {
                    return (
                        <User key={userObj.id} user={userObj}/>
                    ) 
                })}
            </article>
        </div>
    )
}