import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { createUser, getUserByEmail } from "../../services/UserServices"

export const Register = (props) => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: "",
    username: "",
    isAdmin: false,
  })

  const registerNewUser = () => {
    createUser(user).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "reader_user",
          JSON.stringify({
            id: createdUser.id,
            admin: createdUser.isAdmin,
          })
        )
        navigate("/allbooks") // Redirect after registration
      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    getUserByEmail(user.email).then((response) => {
      if (response && response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists")
      } else if (response) {
        // Good email, create user.
        registerNewUser()
        navigate("/allbooks")
      } else {
        console.error("Unexpected response from getUserByEmail:", response)
      }
    }).catch((error) => {
      console.error("Error in handleRegister:", error) // Log any errors
    })
  }

  const updateCustomer = (evt) => {
    const copy = { ...user }
    copy[evt.target.id] = evt.target.value
    setUser(copy)
  }

  return (
    <main style={{ textAlign: "center" }}>
      <form className="form-login" onSubmit={handleRegister}>
        <h1>Archived Reads</h1>
        <h2>Please Register</h2>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="text"
              id="username"
              className="form-control"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="email"
              id="email"
              className="form-control"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label>
              <input
                onChange={(evt) => {
                  const copy = { ...user }
                  copy.isAdmin = evt.target.checked // Fixed to update `isAdmin`
                  setUser(copy)
                }}
                type="checkbox"
                id="isAdmin"
              />
              I am an administrator{" "}
            </label>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <button className="login-btn btn-info" type="submit">
              Register
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  )
}