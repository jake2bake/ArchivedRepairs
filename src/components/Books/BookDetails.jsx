import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { deleteBook, getBookById, getBorrowedBooks, getGenreById } from "../../services/BookServices"
import "./Books.css"

export const BookDetails = ({ currentUser }) => {
    const navigate = useNavigate()
    const { bookId } = useParams()
    const [thisBook, setThisBook] = useState(null)
    const [genre, setGenre] = useState("")
    const [borrowed, setBorrowed] = useState([])

    useEffect(() => {
        getBookById(bookId).then((singleBook) => {
            setThisBook(singleBook)
        })
    }, [bookId])

    useEffect(() => {
        if (thisBook?.genreId) {
            getGenreById(thisBook.genreId).then((genreData) => {
                setGenre(genreData.description)
            })
        }
    }, [thisBook]) 

    useEffect(() => {
        getBorrowedBooks().then((borrowedArray) => {
            setBorrowed(borrowedArray)
        })
    }, [])

    const handleDelete = () => {
        if (thisBook?.id) {
            deleteBook(thisBook).then(() => { 
                navigate("/mybooks") 
            })
        }
    }

    const isBorrowedByCurrentUser = borrowed.some(
        (borrowedBook) => borrowedBook.userId === currentUser.id && borrowedBook.bookId === parseInt(bookId)
    )
    const isAddedByCurrentUser = thisBook?.addedBy === currentUser.id 

    return (
        <div className="book-details">
            <h2>{thisBook?.title}</h2>
            <p><strong>Genre: </strong> {genre || "Unknown"}</p>
            <p><strong>Description: </strong> {thisBook?.description}</p>
            <div><img className="book-cover" src={thisBook?.coverImgUrl} /></div>

            <div className="book-actions">
                {!isBorrowedByCurrentUser ? (
                    <button className="btn-primary">Borrow</button>
                ) : (
                    <button className="btn-primary">Return</button>
                )}
            </div>
            {currentUser.isAdmin && (
                <div className="admin-actions">
                    <button className="btn-danger" onClick={handleDelete}>Delete Book</button>
                </div>
            )}
            {isAddedByCurrentUser && (
                <div>
                    <Link to={`/books/${bookId}/edit`} className="btn-primary">
                        Edit Book
                    </Link>
                </div>
            )}
        </div>
    )
}