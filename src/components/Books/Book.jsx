import { Link } from "react-router-dom"
import "react-bootstrap"
import "./Books.css"
export const Book = ({book}) => {
    return (
        <div className="book">
            <div>
                <div className="book-info">Title: </div>
                <div>{book.title}</div>
            </div>
                <div className="book-info">Description: </div>
                <div>{book.description}</div>
            <div>
                <img className="book-cover" src={book.coverImgUrl}/>
            </div>
            <Link to={`/books/${book.id}`} className="btn-details">
                View Details
            </Link>
            

        </div>
    )
}