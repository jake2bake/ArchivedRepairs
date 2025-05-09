import { useEffect, useState } from "react"
import { getAllBooks } from "../../services/BookServices"
import { Book } from "./Book"
import "./AllBooks.css"

export const AllBooks = () => {
    const [books, setBooksList] = useState([])

    useEffect(() => {
        getAllBooks().then((bookArray) => {
            setBooksList(bookArray)
        })
    }, [])
    return ( <div>
    <article className="books">
        {books.map((bookObj) => {
            return (
                <Book key={bookObj.id} book={bookObj}/>)
        })}
    </article>
    </div>
    
    )
}