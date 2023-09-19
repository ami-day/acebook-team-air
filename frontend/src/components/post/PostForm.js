import React, {useState} from 'react';

const PostForm = ({token}) => {

    const [message, setMessage] = useState('');

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    }

    const handleSubmitPost = async (event) => {
        event.preventDefault();

        if(token) {
    
        fetch( '/posts', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ message: message })
        })
          .then(response => {
            if(response.status === 201) {
              console.log("Post successfully added")
            } else {
              console.log("Post not successfully added")
            }
          })
        } else {
            console.log("No token!");
        }
      }

    return(
<form
        className="container col-3 login-form rounded-4 p-3"
        onSubmit={handleSubmitPost}
      >
        <div className="mb-3">
          <h1 className="text-center">Create Post</h1>
          <label for="message" className="form-label">
            Post
          </label>
          <input
            type="text"
            className="form-control"
            id="message"
            value={message}
            onChange={handleMessageChange}
            placeholder="Type a message here..."
          />
        </div>
        <div className="d-flex justify-content-center">
          <button onClick={handleSubmitPost} type="submit" id="submit" className="btn btn-primary w-50">
            Submit
          </button>
        </div>
      </form>
    )
}

export default PostForm;