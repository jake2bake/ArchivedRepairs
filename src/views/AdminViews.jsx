import { Routes, Route, Outlet } from "react-router-dom"
import {AdminNav} from "../nav/AdminNav"
import { Welcome } from "../components/welcome/Welcome"
import { AllBooks } from "../components/Books/AllBooks"
import { MyBooks } from "../components/Books/MyBooks"
import { BookDetails } from "../components/Books/BookDetails"

export const AdminViews = ({ currentUser }) => {
    return (
        <Routes>
    <Route path="/" element={<><AdminNav /><Outlet /></>}>
    <Route index element={<Welcome />} />
    <Route path="allbooks"
    element={<AllBooks currentUser={currentUser}/>} />
    <Route path="mybooks"
    element={<MyBooks currentUser={currentUser} /> } />
    <Route path="books/:bookId" element={<BookDetails currentUser={currentUser}/>}/>
    
    </Route>
        </Routes>
    )
}