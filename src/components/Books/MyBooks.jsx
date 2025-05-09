import { useEffect, useState } from "react"
import { getAllBooks } from "../../services/BookServices"
import { Book } from "./Book"

export const MyBooks = ({currentUser}) => {
    const [books, setBooks] = useState([])
    const [userBooks, setUserBooks] = useState([])

    useEffect(() => {
        getAllBooks().then((booksArray) => {
            setBooks(booksArray)

            const filteredBooks = books.filter(
                (book) => book.userId === currentUser.id
            )
            setUserBooks(filteredBooks)
        })
    }, [currentUser.id, books])

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
        <section>
            <button className="btn-primary">Add Book</button>
        </section>
        </div>

    )
}