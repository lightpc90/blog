import React, {useEffect, useState} from 'react'
import CommentList from './commentList'
import NewComment from './newComment'
import { Text, Spacer, Container, Divider, } from '@nextui-org/react'

const Comments = ({id, setComments, comments}) => {

  return (
    <div>
        <NewComment postId={id} setComments={setComments} comments={comments} />
        <Spacer />
        <Text weight='bold' align='center'>Comments</Text>
        <Spacer y={.5}/>
        <Container><Divider /></Container>
        <Spacer/>
        {comments?.map((comment, index)=>{
            return(<CommentList comment={comment} index={index} />)  
        })} 
    </div>
  )
}

export default Comments