import React, {useState, useEffect} from 'react'
import { useAuthContext } from '@/context/AuthContext'
import { Text, Spacer, Box, Avatar, Container, Textarea, Divider, Row } from '@nextui-org/react'
import capitalizeFirstLetter from '@/helperFunctions/capitalizeFirstLetter'
import EmailSpliting from '@/helperFunctions/emailSpliting'

const CommentList = ({comment, index}) => {
const {user} = useAuthContext()
const commenter = EmailSpliting(`${comment.commenter}`)

  return (
    <Container key={index}>

        <Container css={{padding:"1rem",
          backgroundColor:"#f0f0f0"}}>
        <Container css={{p:0, backgroundColor:"#f0f0f0"}}>
        <Row align='center' >
          <Avatar color='secondary' textColor='white'  text={capitalizeFirstLetter(commenter).firstTwoLetters}/>
          <Spacer x={.3}/>
          <Text weight='bold'>{commenter}</Text>
        </Row>
        </Container>
        <Container>
          <Text>{comment.content}</Text>
        </Container>
             
        </Container>
        <Row justify='right'>
          <Text>{comment.created}</Text>
        </Row>
        <Divider/>
        <Spacer/>
    </Container>
  )
}

export default CommentList