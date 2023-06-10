import React, { useEffect, useState, useContext } from 'react'
import { Text, Card, Input, Button, Textarea, Spacer, Avatar } from '@nextui-org/react'
import getAPost from '@/firebase/getAPost'
import addComment from '@/firebase/addComment'
import { AuthContext } from '@/context/AuthContext'

const createComment = ({postId}) => {
  const {user, setUser} = useContext(AuthContext)
  const [comment, setComment] = useState('')
  const [commentList, setCommentList] = useState([])

  const handleComment=async()=>{
    setComment(e.target.value)
  }

  const handlePostComment = async()=>{
    let commentObject = {content: comment, commenter: user.id, postId:postId}
    await addComment(commentObject)
  }

  useEffect(()=>{
    const fetchComments =async()=>{
      const [result, error] = await getAPost(postId)
      if (!!result){
        const postInstance = result.data()
        setCommentList(postInstance.comments.map((commentObject)=>{
          return(
            {commentObject}
          )
        }))
      }
    }
    
  }, [postId])

  return (
    <div>
      <Text>Comment</Text>
      <Card>
        <Card.Body>
          <Textarea bordered
            color="secondary"
            labelPlaceholder="Comment" 
            value={comment} onChange={handleComment}/>
          <Button onPress={handlePostComment} 
            color='secondary' auto>
              Post Comment
          </Button>
          
          <Text>Comments</Text>
          {commentList?.map((commentIstance, index)=>{
            return(<>
              <Spacer />
              <Avatar />
              <Text>commentIstance.commenter</Text>
              <Text>commentIstance.content</Text>
              <Text>commentIstance.created</Text>
            </>)
          })}
        </Card.Body>
      </Card>
    </div>
  )
}

export default createComment