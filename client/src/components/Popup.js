import { useState, useEffect } from "react";
import { Form } from "react-router-dom";



export default function Popup({ postObject }) {



  const [commentText, setCommentText] = useState('')
  const [thread, setThread] = useState([])

  console.log(thread);
  useEffect(() => {
    fetch(`/posts/${postObject.id}`)
      .then(response => response.json())
      .then(threadObj => {
        setThread(threadObj.comments)
      })
  }, [])

  function handleChangeCommentText(e) {
    setCommentText(e.target.value)
  }

  function handleCommentTextSubmission() {
    fetch('/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify({
        text: commentText,
        post_id: postObject.id
      }),
    })
      .then(r => r.json())
      .then(data => {
        setThread([...thread, data])
      })
  }


  function rerender_plzz() {
    fetch(`/posts/${postObject.id}`)
      .then(response => response.json())
      .then(threadObj => {
        setThread(threadObj.comments)
      })
  }
  // const username = thread.map(comment=>{
  //     return( comment.user.username)
  // })
  const allCommentsForPost = thread.map(comment => {

    function deleteComment() {
      fetch(`/comments/${comment.id}`, {
        method: 'DELETE'
      }).then(() => {
        rerender_plzz()
      })
    }
    console.log(comment)
    return (
      <div>
        <img className="img" src={comment.image} />
        <p className="post content">{comment.username}:{comment.text}</p>
        <button className="form-button" onClick={deleteComment}>X</button>
      </div>
    )
  })


  return (
    <div className="popup">
      {allCommentsForPost}
      <Form>
        <input type="text" onChange={handleChangeCommentText} value={commentText} placeholder='responses?' />
        <button onClick={handleCommentTextSubmission}>Submit</button>
      </Form>

    </div>
  )

}