import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

export const AdminNav = () => {
    const navigate = useNavigate();
    return (
        <ul className="navbar">
            
            <li className="navbar-item">
                <Link to="/allbooks">All Books</Link>
            </li>
            <li className="navbar-item">
                <Link to="/mybooks">My Books</Link>
            </li>
            <li className="navbar-item"> 
                <Link to="/myreviews">My Reviews</Link>
            </li>
            <li className="navbar-item">
                <Link to="/users">Users</Link>
            </li>
            <li className="navbar-item">
                <Link to="/profile">Profile</Link>
            </li>
            {localStorage.getItem("reader_user") ? (
                <li className="navbar-item navbar-logout">
                    <Link
                        className="navbar-link"
                        to=""
                        onClick={() => {
                            localStorage.removeItem("reader_user");
                            navigate("/", { replace: true });
                        }}
                    >
                        Logout
                    </Link>
                </li>
            ) : (
                ""
            )}
        </ul>
    );
};