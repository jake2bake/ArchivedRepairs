import { useEffect, useState } from "react"
import { getAllBooks } from "../../services/BookServices"
import { Book } from "./Book"
import { useNavigate } from "react-router-dom"


export const MyBooks = ({currentUser}) => {
    const [books, setBooks] = useState([])
    const [userBooks, setUserBooks] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getAllBooks().then((booksArray) => {
            setBooks(booksArray)

            const filteredBooks = booksArray.filter(
                (book) => book.userId === currentUser.id
            )
            setUserBooks(filteredBooks)
        })
    }, [currentUser.id])

    return (<div>
        <article className="books">
            {userBooks.length > 0 ? (
                userBooks.map((bookObj) => (
                    <Book key={bookObj.id} book={bookObj}/>
                ))
            ):(
                <p>No books borrowed yet.</p>
            )}
        </article>
        {currentUser.isAdmin && (
        <section>
            <button className="btn-primary" onClick={() => navigate("/addbook")}
                >
                Add Book
                </button>
            
        </section>
        )}
        </div>

    )
}