import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const ReviewForm = ({currentUser}) => {
    const navigate = useNavigate()
    const { bookId } = useParams()
    const [newReview, setNewReview] = useState({
        userId: currentUser?.id || 0, 
        bookId: parseInt(bookId),
        title: "", 
        rating: 0, 
        comment: ""})


    return (
        <form>
            <h2>Write A Review</h2>
            <fieldset>
                <div className="form-group">
                    <label>Title: </label>
                    <input
                    type="text"
                    placeholder="Enter Title of Review"
                    className="form-control"
                    onChange={(event) => {
                        const reviewCopy = {...newReview}
                        reviewCopy.title = event.target.value
                        setNewReview(reviewCopy)
                    }}
                    />
            <fieldset>
                <div className="form-group">
                <label>Comment: </label>
                <input 
                type="text"
                placeholder="Enter a comment"
                className="form-control"
                onChange={(event) => {
                    const reviewCopy = {...newReview}
                    reviewCopy.comment = event.target.value
                    setNewReview(reviewCopy)
                }}
                />
            </div>
            </fieldset>

                </div>

            </fieldset>
        </form>
    )
}