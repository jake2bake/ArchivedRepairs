import { useEffect, useState } from "react"
import { getUserById } from "../../services/UserServices"
import "./UsersList.css"
import { getBorrowedBooks, getAllBooks } from "../../services/BookServices"
import { useNavigate } from "react-router-dom"
import { deleteUser } from "../../services/UserServices"


export const UserProfile = ({currentUser}) => {
    const [user, setUser] = useState({})
    const [borrowedTitles, setBorrowedTitles] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        Promise.all([getAllBooks(), getBorrowedBooks()]).then(([books, borrowedBooks]) => {
            const userBorrowed = borrowedBooks.filter(b => b.userId === currentUser.id)
            const titles = userBorrowed
            .map(b => books.find(book => book.id === b.bookId))
            .filter(Boolean)
            .map(book => book.title)
            setBorrowedTitles(titles)
        })
    }, [currentUser])
    
   

    useEffect(() => {
        if (currentUser.id) {
            getUserById(currentUser.id).then((data) => {setUser(data)})
        }
        
            setUser(currentUser)
        
 }, [ currentUser])

    return (
        <section className="user-profile">
            <header className="user-header">{user?.username || "User Profile"}</header>
            <div>
                <span className="email">Email: </span>
                {user?.email || "No email available"}
            </div>
            <div>
                <img className="user-pfp" src={user?.pfp}/>
            </div>
            <div>
                <h2>Borrowed Books: </h2>
                {borrowedTitles.length > 0 ? (
                    <ul>
                        {borrowedTitles.map((title, idx) => (
                            <li key={idx}>{title}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No borrowed books.</p>
                )}
            </div>
            {user?.id === currentUser.id && (
                <div className="profile-actions">
                    <button 
                        className="btn btn-primary"
                        onClick={() => navigate(`/profile/edit`)}
                    >
                        Edit Profile
                    </button>
                    <button 
                        className="btn btn-danger"
                        onClick={() => {
                            if (window.confirm("Are you sure you want to delete your profile?")) {
                                deleteUser(user.id).then(() => {
                                    localStorage.removeItem("reader_user")
                                    navigate("/", {replace: true})
                                })
                            }
                        }}
                    >
                        Delete Profile
                    </button>
                </div>
            )}
        </section>
    )
}