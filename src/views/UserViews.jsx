import { Routes, Route, Outlet } from "react-router-dom"
import { Welcome } from "../components/welcome/Welcome"
import { AllBooks } from "../components/Books/AllBooks"
import { UserNav } from "../nav/UserNav"
import { MyBooks } from "../components/Books/MyBooks"
import { BookDetails } from "../components/Books/BookDetails"
import { UserProfile } from "../components/users/UserProfile"

export const UserViews = ({ currentUser }) => {
    return (
        <Routes>
            <Route 
                path="/" 
                element={
                    <>
                        <UserNav />
                        <Outlet />
                    </>
                }
            >
                <Route index element={<Welcome />} />
                <Route path="allbooks" element={<AllBooks currentUser={currentUser} />} />
                <Route path="mybooks" element={<MyBooks currentUser={currentUser} />} /> 
                <Route path="books/:bookId" element={<BookDetails currentUser={currentUser} />} />
                <Route path="profile" element={<UserProfile currentUser={currentUser}/>} />
                    <Route path="users/:userId" element={<UserProfile  currentUser={currentUser}/>} />
            </Route>
        </Routes>
    )
}