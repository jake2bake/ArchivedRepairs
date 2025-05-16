import { Routes, Route, Outlet } from "react-router-dom"
import {AdminNav} from "../nav/AdminNav"
import { Welcome } from "../components/welcome/Welcome"
import { AllBooks } from "../components/Books/AllBooks"
import { MyBooks } from "../components/Books/MyBooks"
import { BookDetails } from "../components/Books/BookDetails"
import { BookForm } from "../components/Books/BookForm"
import { UpdateBook } from "../components/Books/UpdateBook"
import { UserProfile } from "../components/users/UserProfile"
import { ReviewForm } from "../components/reviews/ReviewForm"
import { MyReviews } from "../components/reviews/MyReviews"
import { UsersList } from "../components/users/UsersList"
import { UserProfileForm } from "../components/users/UserProfileForm"


export const AdminViews = ({ currentUser }) => {
    return (
        <>
            <AdminNav />
            <main>
                <Routes>
                    <Route path="/" element={<Outlet />}>
                        <Route index element={<Welcome />} />
                        <Route path="allbooks" classname="navbar-item" element={<AllBooks currentUser={currentUser} />} />
                        <Route path="mybooks" classname="navbar-item" element={<MyBooks currentUser={currentUser} key={window.location.pathname + window.location.search} />} />
                        <Route path="books/:bookId" classname="navbar-item" element={<BookDetails currentUser={currentUser} />} />
                        <Route path="addbook" element={<BookForm currentUser={currentUser} />} />
                        <Route path="books/:bookId/edit" element={<UpdateBook />} />
                        <Route path="profile" element={<UserProfile currentUser={currentUser} />} />
                        <Route path="users/:userId" element={<UserProfile currentUser={currentUser} />} />
                        <Route path="myreviews" element={<MyReviews currentUser={currentUser} />} />
                        <Route path="books/:bookId/review" element={<ReviewForm currentUser={currentUser} />} />
                        <Route path="books/:bookId/review/:reviewId/edit" element={<ReviewForm currentUser={currentUser} />} />
                        <Route path="users" element={<UsersList currentUser={currentUser} />} />
                        <Route path="profile/edit" element={<UserProfileForm currentUser={currentUser} />} />
                    </Route>
                </Routes>
            </main>
        </>
    )
}