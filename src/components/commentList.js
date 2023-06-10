import React, {useState, useEffect} from 'react'
import getAPost from '@/firebase/getAPost'
import { Text, Spacer, Avatar, Container } from '@nextui-org/react'

const CommentList = ({postId}) => {
    const [comments, setComments] = useState([])

    useEffect(()=>{
        const fetchComments =async()=>{
          const {result, error} = await getAPost(postId)
          if (!!result){
            const postInstance = result.data()
            setComments(postInstance.comments?.map((commentObject)=>{
              return(
                {commentObject}
              )
            }))
          }
        }
        if(postId){fetchComments()}
       
      }, [postId])

  return (
    <div>
    {comments?.map((commentIstance, index)=>{
    return(<Container key={index}>
        <Spacer />
        <Avatar />
        <Text>commentIstance.commenter</Text>
        <Text>commentIstance.content</Text>
        <Text>commentIstance.created</Text>
    </Container>)
    })}
    </div>
  )
}

export default CommentList