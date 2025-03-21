import React, { useState, useContext, useEffect} from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm() {

    const [text, setText] = useState('')
    const [rating, setRating] = useState(10)

    // State variable to track whether the 'Send' button is disabled,
    // default as disabled
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState('')

    const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

    useEffect( () => {
        if (feedbackEdit.edit === true ){
            setBtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit])


    // Function to handle changes in the text input
    const handleTextChange = (e) => {

        // Check if the text is empty, disable button if no input.
        if (text === '') {
            setBtnDisabled(true)
            setMessage(null)
        }
        // Display validation message if input is less than 10 characters.
        else if (text !== '' && text.trim().length <= 10) {
            setMessage('Please ensure your text is at least 10 characters long.')
            setBtnDisabled(true)
        }
        // Enable the button if the text length exceeds 10 characters
        else {
            setMessage(null)
            setBtnDisabled(false)
        }

        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(text.trim().length > 10){
            const newFeedback = {
                text,
                rating
            }           
            
            if (feedbackEdit.edit === true ){
                updateFeedback(feedbackEdit.item.id, newFeedback)
            } else {
                addFeedback(newFeedback)
            }


            setText('') // Reset text
        }
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>How would you rate your service with us?</h2>
                <RatingSelect select={(rating) => setRating(rating)} />
                <div className='input-group'>
                    <input
                        onChange={handleTextChange}
                        type="text" 
                        placeholder='Write a review...' 
                        value={text}                      
                        />
                    <Button type='submit' isDisabled={btnDisabled}>
                        Send
                    </Button>
                </div>
                {/* Display validation message (if any) */}
                {message && <div className='message'>{message}</div>}
            </form>
        </Card>

    )
}

export default FeedbackForm
