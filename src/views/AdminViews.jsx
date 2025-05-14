import { Routes, Route, Outlet } from "react-router-dom"
import {AdminNav} from "../nav/AdminNav"
import { Welcome } from "../components/welcome/Welcome"
import { AllBooks } from "../components/Books/AllBooks"
import { MyBooks } from "../components/Books/MyBooks"
import { BookDetails } from "../components/Books/BookDetails"
import { BookForm } from "../components/Books/BookForm"
import { UpdateBook } from "../components/Books/UpdateBook"
import { UserProfile } from "../components/users/UserProfile"


export const AdminViews = ({ currentUser }) => {
    return (
        <Routes>
    <Route path="/" element={<><AdminNav /><Outlet /></>}>
    <Route index element={<Welcome />} />
    <Route path="allbooks"
    element={<AllBooks currentUser={currentUser}/>} />
    <Route path="mybooks"
    element={<MyBooks currentUser={currentUser} key={window.location.pathname + window.location.search}/> } />
    <Route path="books/:bookId" element={<BookDetails currentUser={currentUser}/>}/>
    <Route path="addbook" element={<BookForm currentUser={currentUser} />}/>
    <Route path="books/:bookId/edit" element={<UpdateBook />}/>
    {/* <Route path="users" element={<UserProfile currentUser={currentUser} />} /> */}
    <Route path="profile" element={<UserProfile currentUser={currentUser}/>} />
    <Route path="users/:userId" element={<UserProfile  currentUser={currentUser}/>} />
    </Route>
        </Routes>
    )
}