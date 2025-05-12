import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addBook } from "../../services/BookServices"

export const BookForm = ({currentUser}) => {
    const navigate = useNavigate()
    const [newBook, setNewBook] = useState({title: "", description: "", coverImgUrl: "", genreId: 0})


    const handleSave = (event) => {
    event.preventDefault()

    if (newBook.title) {
        const bookToSave = {
            title: newBook.title,
            description: newBook.description,
            coverImgUrl: newBook.coverImgUrl,
            userId: currentUser.id,
            addedBy: currentUser.id,
            genreId: newBook.genreId
        }
        addBook(bookToSave).then(() => {
            navigate("/allbooks")
        })
    }
    }

    return (
        <form onSubmit={handleSave}>
            <h2>Add A New Book</h2>
            <fieldset>
                <div className="form-group">
                    <label>Title</label>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Title of book"
                    onChange={(event) => {
                        const bookCopy = {...newBook}
                        bookCopy.title = event.target.value
                        setNewBook(bookCopy)
                    }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Genre</label>
                    <select
                    className="form-control"
                    value={newBook.genreId ? newBook.genreId : 0}
                    onChange={(event) => {
                        const bookCopy = {...newBook}
                        bookCopy.genreId = parseInt(event.target.value)
                        setNewBook(bookCopy)
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
                    <label>Description</label>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Description of book"
                    onChange={(event) => {
                        const bookCopy = {...newBook}
                        bookCopy.description = event.target.value
                        setNewBook(bookCopy)
                    }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Cover Image URL</label>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Cover image URL"
                    onChange={(event) => {
                        const bookCopy = {...newBook}
                        bookCopy.coverImgUrl = event.target.value
                        setNewBook(bookCopy)
                    }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <button
                    className="btn btn-primary"
                    // onClick={handleSave}
                    >
                        Save Book
                    </button>
                </div>
            </fieldset>
        </form>
    )

}