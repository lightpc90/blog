import React from 'react'
import { Spacer, Container, Text } from '@nextui-org/react'

const LoginAvatar = ({user}) => {

  return (
    <>
        <Spacer />
        <Container display='flex' justify='flex-end'>
        <Text>Hi,</Text>
        <Spacer x={.5}/>
        <Text weight='bold' color ='secondary'>{user.username}</Text>
        </Container>
    </>
  )
}

export default LoginAvatar