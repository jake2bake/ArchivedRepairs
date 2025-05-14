import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { deleteBook, getBookById, getBorrowedBooks, getGenreById, borrowBook, returnBook } from "../../services/BookServices"
import "./Books.css"
import { getReviews } from "../../services/ReviewServices"

export const BookDetails = ({ currentUser }) => {
    const navigate = useNavigate()
    const { bookId } = useParams()
    const [thisBook, setThisBook] = useState(null)
    const [genre, setGenre] = useState("")
    const [borrowed, setBorrowed] = useState([])
    const [reviews, setReviews] = useState([])

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

    useEffect(() => {
        getReviews().then((reviews) => {
            setReviews(reviews)
        })
    }, [])
    
    const reviewsForThisBook = reviews.filter(review => review?.bookId === thisBook?.id)
    
    const isBorrowedByCurrentUser = borrowed.some(
        (borrowedBook) => borrowedBook.userId === currentUser.id && borrowedBook.bookId === parseInt(bookId)
    )
    const isAddedByCurrentUser = thisBook?.addedBy === currentUser.id 

    const handleBorrow = () => {
        if (!isBorrowedByCurrentUser && thisBook?.id) {
            const borrowedBook = {
                userId: currentUser.id, 
                borrowedDate: new Date().toISOString(), 
                bookId: thisBook.id
            }

            borrowBook(borrowedBook).then(() => {
                navigate("/mybooks", {replace: true}) 
                window.location.reload()
            })
        }
    }
    const handleReturn = () => {
        if (isBorrowedByCurrentUser && thisBook?.id) {
            const borrowedBook = borrowed.find(
                (borrowedBook) =>
                    borrowedBook.userId === currentUser.id &&
                    borrowedBook.bookId === thisBook.id
            )

            if (borrowedBook?.id) {
                returnBook(borrowedBook.id).then(() => {
                    navigate("/mybooks") 
                })
            }
        }
    }

    return (
        <div className="book-details">
            <h2>{thisBook?.title}</h2>
            <p><strong>Genre: </strong> {genre || "Unknown"}</p>
            <p><strong>Description: </strong> {thisBook?.description}</p>
            <div><img className="book-cover" src={thisBook?.coverImgUrl} /></div>
            <div>
                <strong className="book-review"><h3>Reviews: </h3></strong>
                 {reviewsForThisBook.length > 0 ? (
                    <ul className="book-reviews">
                        {reviewsForThisBook.map((review) => (
                            <li key={review.id}>
                                <strong className="book-reviews-title">{review.title}</strong>
                                <p>{review.comment}</p>
                            </li>
                        ))}
                    </ul>
                 ) : (
                    <p>No reviews yet.</p>
                 )}
                 
            </div>

            <div className="book-actions">
                {isAddedByCurrentUser ? null : (
                    !isBorrowedByCurrentUser ? (
                    <button className="btn-primary" onClick={handleBorrow}>Borrow</button>
                ) : (
                    <button className="btn-primary" onClick={handleReturn}>Return</button>
                )
                )}
            </div>
            {isAddedByCurrentUser && (
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
            <div className="book-actions">
                <Link to={`/books/${bookId}/review`} className="btn-primary">
                    Write a Review
                </Link>
            </div>
        </div>
    )
}