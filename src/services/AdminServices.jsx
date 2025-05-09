export const getAdmins = () => {
    return fetch(`http://localhost:8088/users?isAdmin=true`).then((res) => res.json())
}