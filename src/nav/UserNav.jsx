import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css"

export const UserNav = () => {
    const navigate = useNavigate()

    return (<ul className="navbar"> 
    <li className="navbar-item">
        <Link className="navbar-link" to="/allbooks">
        All Books  
        </Link>
    </li>
    <li className="navbar-item">
        <Link className="navbar-link" to="/mybooks">
        My Books
        </Link>
    </li>
    <li className="navbar-item">
        <Link className="navbar-link" to="/profile">
        Profile
        </Link>
    </li>
    <li className="navbar-item">
        <Link className="navbar-link" to="/myreviews">
        My Reviews
        </Link>
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
    )
}