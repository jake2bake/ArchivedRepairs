export const getReviews = () => {
    return fetch("http://localhost:8088/reviews").then((res) => res.json())
}

export const getReviewsByUserId = (userId) => {
    return fetch(`http://localhost:8088/reviews?userId=${userId}&_expand=book`).then((res) => res.json())

}

export const addReview = (review) => {
    return fetch("http://localhost:8088/reviews", {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify(review)
    })
}