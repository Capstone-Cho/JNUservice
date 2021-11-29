import React, {useState} from 'react'
import {Comment, Avatar} from 'antd'
import Axios from 'axios'
import {useSelector} from 'react-redux'
import LikeDislikes from './LikeDislikes'
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
    height: 100%;
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

function SingleComment(props) {
    const user = useSelector(state => state.user)
    const [CommentValue, setCommentValue] = useState('')
    const [OpenReply, setOpenReply] = useState(false)

    const handleChange = e => {
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const onSubmit = e => {
        e.preventDefault()

        const variables = {
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id,
            content: CommentValue,
        }

        Axios.post('/api/comment/saveComment', variables).then(response => {
            if (response.data.success) {
                setCommentValue('')
                setOpenReply(!OpenReply)
                props.refreshFunction(response.data.result)
            } else {
                alert('Failed to save Comment')
            }
        })
    }

    const actions = [
        <LikeDislikes comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />,
        <span onClick={openReply} key="comment-basic-reply-to">
            Reply to{' '}
        </span>,
    ]

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt="image" />}
                content={<p>{props.comment.content}</p>}
            ></Comment>

            {OpenReply && (
                <form style={{display: 'flex'}} onSubmit={onSubmit}>
                    <Text
                        style={{width: '100%', borderRadius: '5px'}}
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="write some comments"
                    />
                    <br />
                    <Button style={{width: '20%', height: '52px'}} onClick={onSubmit}>
                        Submit
                    </Button>
                </form>
            )}
        </div>
    )
}

export default SingleComment
