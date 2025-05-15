import { Link } from "react-router-dom"

export const User = ({user}) => {
    return (
        <div className="user">
            <div>
                <div className="user-info">Name: </div>
                <div>{user.username}</div>
            </div>
                <div className="user-info">Email: </div>
                <div>{user.email}</div>
            
            <div>
                <img className="user-pfp" src={user.pfp} />
            </div>
            

        </div>
    )

}