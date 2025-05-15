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

export const getThemReviews = () => {
    return fetch("http://localhost:8088/reviews?_expand=user").then((res) => res.json())
}

export const getReviewById = (reviewId) => {
    return fetch(`http://localhost:8088/reviews/${reviewId}`).then((res) => res.json())

}

export const updateReview = (reviewId, review) => {
    return fetch(`http://localhost:8088/reviews/${reviewId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify(review)
    })
}