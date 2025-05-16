export const getUserByEmail = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`).then((res) => res.json())
}

export const getUserById = (userId) => {
    return fetch(`http://localhost:8088/users/${userId}`).then((res) => res.json())
}

export const getAllUsers = () => {
    return fetch("http://localhost:8088/users").then((res) => res.json())
}

export const createUser = (newUser) => {
    return fetch("http://localhost:8088/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
    }).then((res) => res.json())
}

export const deleteUser = (userId) => {
    return fetch(`http://localhost:8088/users/${userId}`, { method: "DELETE"})
}

export const updateUser = (user) => {
    return fetch(`http://localhost:8088/users/${user.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    })
}