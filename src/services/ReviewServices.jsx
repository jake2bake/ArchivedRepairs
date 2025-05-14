export const getReviews = () => {
    return fetch("http://localhost:8088/reviews").then((res) => res.json())
}