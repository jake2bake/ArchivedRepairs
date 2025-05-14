import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { Routes, Route } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { ApplicationViews } from "./views/ApplicationViews"

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="*"
        element={
          <Authorized>
            <ApplicationViews />
          </Authorized>
        }
      />
    </Routes>
  );
};
