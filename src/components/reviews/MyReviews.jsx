import { useEffect, useState } from "react"
import { getReviewsByUserId } from "../../services/ReviewServices"
import { useNavigate } from "react-router-dom"
import "./Reviews.css"

export const MyReviews = ({currentUser}) => {
    const [theseReviews, setTheseReviews] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        getReviewsByUserId(currentUser.id).then((reviewArray) => {
            setTheseReviews(reviewArray)
        })
    }, [currentUser.id])

    return (
        <section className="review-container">
            <div>
                {theseReviews.length === 0 ? (
                    <p>No reviews found.</p>
                ) :
                (
            theseReviews.map((review) => (
                <div className="review-info" key={review.id}>
                    <div>Book: <h2><strong>{review.book?.title}</strong></h2></div>
                    <img src={review.book?.coverImgUrl}></img>
                    <h3><strong>{review?.title}</strong></h3>
                    <div>{review?.comment}</div>
                    <button onClick={() => navigate(`/books/${review.bookId}/review/${review.id}/edit`)}>Edit Review</button>

                </div>
            ))
        )}
                
            </div>
        </section>
    )

}