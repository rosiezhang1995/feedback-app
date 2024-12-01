import React, { useState } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'

function FeedbackForm() {

    const [text, setText] = useState('')

    // State variable to track whether the 'Send' button is disabled,
    // default as disabled
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState('')


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

    return (
        <Card>
            <form>
                <h2>How would you rate your service with us?</h2>
                <div className='input-group'>
                    <input
                        onChange={handleTextChange}
                        type="text" placeholder='Write a review...' />
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
