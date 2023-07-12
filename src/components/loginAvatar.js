import React, { useState, useEffect } from 'react'
import { Spacer, Container, Text, Avatar, Row, Col } from '@nextui-org/react'

const LoginAvatar = ({user}) => {

  const [userDP, setUserDP] = useState('/images/avatar_dp.jpg')

  useEffect(()=>{
    const dpUrl = localStorage.getItem(`${user.username}-dp`)
    if(dpUrl){setUserDP(dpUrl)}
    else{setUserDP('/images/avatar_dp.jpg')}
  },[])

  return (
    <>
        <Spacer />
        <Container display='flex'>
          <Col align='right'>
            <Avatar size="lg" color='secondary' 
              bordered
            src={userDP} />
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