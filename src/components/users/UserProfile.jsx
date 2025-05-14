import { useEffect, useState } from "react"
import { getUserById } from "../../services/UserServices"


export const UserProfile = ({currentUser}) => {
    console.log(currentUser)
    const [user, setUser] = useState({})

   

    useEffect(() => {
        if (currentUser.id) {
            getUserById(currentUser.id).then((data) => {setUser(data)})
        }
        
            setUser(currentUser)
        
 }, [ currentUser])

    return (
        <section className="user">
            <header className="user-header">{user?.username || "User Profile"}</header>
            <div>
                <span className="email">Email: </span>
                {user?.email || "No email available"}
            </div>
        </section>
    )
}