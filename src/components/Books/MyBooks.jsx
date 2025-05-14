import { useEffect, useState } from "react"
import { getAllBooks, getBorrowedBooks } from "../../services/BookServices"
import { Book } from "./Book"
import { useNavigate } from "react-router-dom"

export const MyBooks = ({ currentUser }) => {
    const [books, setBooks] = useState([])
    const [userBooks, setUserBooks] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        Promise.all([getAllBooks(), getBorrowedBooks()]).then(([booksArray, borrowedBooks]) => {
            setBooks(booksArray)

           
            const borrowed = borrowedBooks
                .filter((borrowedBook) => borrowedBook.userId === currentUser.id)
                .map((borrowedBook) => booksArray.find((book) => book.id === borrowedBook.bookId))
                .filter(Boolean)

            const owned = booksArray.filter((book) => book.userId === currentUser.id)

            const combined = [...owned, ...borrowed].filter(
                (book, index, self) => book && self.findIndex(b => b.id === book.id) === index
            )

            setUserBooks(combined)
        })
    }, [currentUser.id])

    return (
        <div>
            <article className="books">
                {userBooks.length > 0 ? (
                    userBooks.map((bookObj) => (
                        <Book key={bookObj.id} book={bookObj} />
                    ))
                ) : (
                    <p>No books borrowed yet.</p>
                )}
            </article>
            {currentUser.isAdmin && (
                <section>
                    <button
                        className="btn-primary"
                        onClick={() => navigate("/addbook")}
                    >
                        Add Book
                    </button>
                </section>
            )}
        </div>
    )
}