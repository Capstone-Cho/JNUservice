import React, {useState} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'
import styled from 'styled-components'

const Text = styled.textarea`
    width: 100%;
    border-radius: 5px;
    outline: none;
    padding: 0 10px;
    border: 1px solid lightgray;
    transition: border 0.5s;
    &:hover {
        border: 1px solid #ffc000;
    }
    &:focus {
        border: 1px solid #ffc000;
    }
`

const Button = styled.button`
    width: 20%;
    padding: 10px;
    background-color: #fff;
    border: 1px solid lightgray;
    border-radius: 5px;
    &:hover {
        cursor: pointer;
        border: 1px solid #ffc000;
        color: #ffc000;
    }
`

function Comments(props) {
    const user = useSelector(state => state.user)
    const [Comment, setComment] = useState('')

    const handleChange = e => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = e => {
        e.preventDefault()

        const variables = {
            content: Comment,
            writer: user.userData._id,
            postId: props.postId,
        }

        axios.post('/api/comment/saveComment', variables).then(response => {
            if (response.data.success) {
                setComment('')
                props.refreshFunction(response.data.result)
            } else {
                alert('Failed to save Comment')
            }
        })
    }

    return (
        <div>
            <br />
            <p> replies</p>
            <hr />
            {/* Comment Lists  */}
            {/* {console.log(props.CommentLists)} */}

            {props.CommentLists &&
                props.CommentLists.map(
                    (comment, index) =>
                        !comment.responseTo && (
                            <React.Fragment>
                                <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                                <ReplyComment
                                    CommentLists={props.CommentLists}
                                    postId={props.postId}
                                    parentCommentId={comment._id}
                                    refreshFunction={props.refreshFunction}
                                />
                            </React.Fragment>
                        ),
                )}

            {/* Root Comment Form */}
            <form style={{display: 'flex'}} onSubmit={onSubmit}>
                <Text onChange={handleChange} value={Comment} placeholder="write some comments" />
                <br />
                <Button style={{width: '20%', height: '52px'}} onClick={onSubmit}>
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default Comments
