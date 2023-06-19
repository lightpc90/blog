import React, {useEffect, useState} from 'react'
import CommentList from './commentList'
import NewComment from './newComment'
import { Text, Spacer, Container, Divider, } from '@nextui-org/react'

const Comments = ({id, setComments, comments}) => {

  return (
    <div>
        <NewComment postId={id} setComments={setComments} />
        <Spacer />
        <Text weight='bold' align='center'>Comments</Text>
        <Spacer y={.5}/>
        <Container><Divider /></Container>
        <Spacer/>
        {comments?.map((comment)=>{
            return(<CommentList comment={comment} />)  
        })} 
    </div>
  )
}

export default Comments