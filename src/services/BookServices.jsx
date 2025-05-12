export const getAllBooks = () => {
    return fetch("http://localhost:8088/books").then((res) => res.json())
}

export const getBookById = (bookId) => {
    return fetch(`http://localhost:8088/books/${bookId}`).then((res) => res.json())
}

export const getGenreById = (genreId) => {
    return fetch(`http://localhost:8088/genres/${genreId}`).then((res) => res.json())
}

export const getBorrowedBooks = () => {
    return fetch("http://localhost:8088/borrowedBooks").then((res) => res.json())
}

export const addBook = (newBook) => {
    return fetch("http://localhost:8088/books", {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify(newBook)
    })
}

export const updateBook = (book) => {
    return fetch(`http://localhost:8088/books/${book.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book)
    })
}