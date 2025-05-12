import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getBookById, updateBook } from "../../services/BookServices"

export const UpdateBook = () => {
    const [thisBook, setThisBook] = useState(null)
    const navigate = useNavigate()
    const {bookId} = useParams()

    useEffect(() => {
        getBookById(bookId).then((bookObj) => {
            setThisBook(bookObj)
        })
    }, [bookId])

    const handleSave = (event) => {
        event.preventDefault()

        const editedBook = {
            ...thisBook,
            title: thisBook.title,
            description: thisBook.description,
            genreId: thisBook.genreId
        }
        updateBook(editedBook).then(() => {
            navigate(`/mybooks`)
        })
    }
    if (!thisBook) {
        return <div>Loading...</div>
    }

    return (
        <form className="book" onSubmit={handleSave}>
            <h2>Edit Book Info</h2>
            <fieldset>
                <div className="form-group">
                    <label>Title: </label>
                    <input type="text"
                    value={thisBook.title || ""}
                    onChange={(event) => {
                        const copy = { ...thisBook }
                        copy.title = event.target.value
                        setThisBook(copy)
                    }}
                    required 
                    className="form-control" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Genre: </label>
                    <select
                    className="form-control"
                    value={thisBook.genreId || 0}
                    onChange={(event) => {
                        const bookCopy = { ...thisBook }
                        bookCopy.genreId = parseInt(event.target.value)
                        setThisBook(bookCopy)
                    }}
                    >
                        <option value="0">Select a genre</option>
                        <option value="1">Fiction</option>
                        <option value="2">Non-Fiction</option>
                        <option value="3">Mystery</option>
                        <option value="4">Fantasy</option>
                        <option value="5">Science Fiction</option>
                        <option value="6">Horror</option>
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                    value={thisBook.description || ""}
                    onChange={(event) => {
                        const copy = { ...thisBook }
                        copy.description = event.target.value
                        setThisBook(copy)
                    }}
                    required
                    className="form-control"/>
                </div>
            </fieldset>
            <button type="submit" className="btn-primary">Save</button>
        </form>
    )
}