import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import { Outlet } from "react-router-dom"
import { Welcome } from "../components/welcome/Welcome"
import { AllBooks } from "../components/Books/AllBooks"



import { UserNav } from "../nav/UserNav"

export const UserViews = ({ currentUser }) => {
    return (<Routes>
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
            <Route path="allbooks"> 
            <Route index element={<AllBooks currentUser={currentUser} />} />
            
            </Route>
        </Route>
    </Routes>
    )
}