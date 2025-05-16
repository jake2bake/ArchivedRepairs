import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserById } from "../../services/UserServices"
import { updateUser } from "../../services/UserServices"
import "./ProfileForm.css"
export const UserProfileForm = ({currentUser}) => {
        const [user, setUser] = useState({
            username: "",
            email: "",
            pfp: ''
        })

    const navigate = useNavigate()  
    
    useEffect(() => {
        if (currentUser?.id) {
            getUserById(currentUser.id).then(setUser)
        }
    }, [currentUser])

const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
}

const handleSubmit = (e) => {
    e.preventDefault()
    updateUser(user).then(() => {
        navigate("/profile")
    })
}

 return (
    <form className="profile-form" onSubmit={handleSubmit}>
        <h2>Edit Profile</h2>
        <div>
            <label>Username: </label>
            <input 
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                required
            />
        </div>
        <div>
            <label>Email: </label>
            <input 
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
            />
        </div>
        <div>
            <label>Profile Picture: </label>
            <input
                type="text"
                name="pfp"
                value={user.pfp}
                onChange={handleChange}
            />
        </div>
        <button className="btn btn-primary" type="submit">
            Save Changes
        </button>
    </form>
 )

}