export const getUserByEmail = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`).then((res) => res.json())
}

export const getUserById = (userId) => {
    return fetch(
        `http://localhost:8088/users?id=${userId}&_expand=user`
    ).then((res) => res.json())
}

export const getAllUsers = () => {
    return fetch("http://localhost:8088/users").then((res) => res.json())
}