import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getBookById, getBorrowedBooks, getGenreById } from "../../services/BookServices"
import "./Books.css"
export const BookDetails = ({currentUser}) => {
    const navigate = useNavigate()
    const {bookId} = useParams()
    const [book, setBook] = useState(null)
    const [genre, setGenre] = useState("")
    const [borrowed, setBorrowed] = useState([])

    useEffect(() => {
        getBookById(bookId).then((thisBook) => {
            setBook(thisBook)

            if (thisBook.genreId) {
                getGenreById(thisBook.genreId).then((genreData) => {
                    setGenre(genreData.description)
                })
            }
        })
    }, [bookId])

    useEffect(() => {
        getBorrowedBooks().then((borrowedArray) => {
            setBorrowed(borrowedArray)
        })
    }, [])
    
    const isBorrowedByCurrentUser = borrowed.some(
        (borrowedBook) => borrowedBook.userId === currentUser.id && borrowedBook.bookId === parseInt(bookId)
    )
   
    return (
        <div className="book-details">
            <h2>{book?.title}</h2>
            <p><strong>Genre: </strong> {genre || "Unknown"}</p>
            <p><strong>Description: </strong> {book?.description}</p>
            <div><img className="book-cover" src={book?.coverImgUrl} /></div>

             <div className="book-actions">
                {!isBorrowedByCurrentUser ? (
                    <button className="btn-primary">Borrow</button>
                ) :
                (
                    <button className="btn-primary">Return</button>
                )}
            </div> 
                {currentUser.isAdmin && (
                    <div className="admin-actions">
                        <button className="btn-danger">
                            Delete Book
                        </button>
                    </div>)}

        </div>
    )
}