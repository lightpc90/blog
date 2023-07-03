import React from 'react'
import { Container, Row, Col, Text, Spacer, Avatar } from '@nextui-org/react'

const AuthorAvatar = ({author, post}) => {
  return (
 <Container css={{p:'$2', }}>
    <Col gap={2}>
      <Row align='center'>
      <Avatar color='secondary' bordered
      src='/images/avatar_dp.jpg'/>
      <Spacer x={.3}/>
      <Text >{author}</Text>
      </Row>
      <Row>
        <Spacer x={.3}/>
        <Text >{post.created}</Text>
      </Row>
    </Col>
  </Container>
  )
}

export default AuthorAvatar