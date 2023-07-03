import React from 'react'
import { Spacer, Container, Text, Avatar, Row, Col } from '@nextui-org/react'

const LoginAvatar = ({user}) => {

  return (
    <>
        <Spacer />
        <Container display='flex'>
          <Col align='right'>
            <Avatar size="lg" color='secondary' 
            bordered
            src='/images/avatar_dp.jpg' />
            <Row justify='right'>
            <Text>Hi,</Text>
            <Spacer x={.5}/>
            <Text weight='bold' color ='secondary'>{user.username}</Text>
            </Row>
          </Col>
        
        </Container>
    </>
  )
}

export default LoginAvatar