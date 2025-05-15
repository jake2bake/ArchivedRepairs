import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { addReview } from "../../services/ReviewServices"
import { getReviewById } from "../../services/ReviewServices"

export const ReviewForm = ({currentUser}) => {
    const navigate = useNavigate()
    const { bookId, reviewId } = useParams()
    const [newReview, setNewReview] = useState({
        userId: currentUser?.id || 0, 
        bookId: parseInt(bookId),
        title: "", 
        rating: 0, 
        comment: ""})

    useEffect(() => {
        if (reviewId) {
            getReviewById(reviewId).then(setNewReview)
        }
    }, [reviewId])

    const handleSave = (event) => {
        event.preventDefault()

        const reviewToSave = {
            userId: currentUser?.id || 0,
            bookId: parseInt(bookId),
            title: newReview.title,
            comment: newReview.comment      
        }
        addReview(reviewToSave).then(() => {
            navigate(`/books/${bookId}`)
        })

    }


    return (
        <form>
            <h2>Write A Review</h2>
            <fieldset>
                <div className="form-group">
                    <label>Title: </label>
                    <input
                    type="text"
                    value={newReview.title}
                    placeholder="Enter Title of Review"
                    className="form-control"
                    onChange={(event) => {
                        const reviewCopy = {...newReview}
                        reviewCopy.title = event.target.value
                        setNewReview(reviewCopy)
                    }}
                    />
            </div>
                <div className="form-group">
                <label>Comment: </label>
                <input 
                type="text"
                value={newReview.comment}
                placeholder="Enter a comment"
                className="form-control"
                onChange={(event) => {
                    const reviewCopy = {...newReview}
                    reviewCopy.comment = event.target.value
                    setNewReview(reviewCopy)
                }}
                />
            </div>
            
      
            <div className="form-group">
                <button className="btn btn-primary" onClick={handleSave}>
                    Save Review
                </button>
            </div>

            </fieldset>
        </form>
    )
}