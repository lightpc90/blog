import React, {useState} from 'react'
import { Button, Input, Spacer, Text, Row } from '@nextui-org/react'
import signIn from '@/firebase/auth/signIn'

const CommentLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmail=(e)=>{
        setEmail(e.target.value)
    }
    const handlePassword =(e)=>{
        setPassword(e.target.value)
    }
    const handleLoginSubmit=async()=>{
        const {result, error} = await signIn(email, password)
        if (!!result){console.log("user logged in")}
        else{console.log('error :', error)}
    }
  return (
    <div>
        <Spacer />
        <Text weight='bold'>Login</Text>
        <Spacer />
        <Row>
            <Input clearable 
                color='secondary' 
                bordered 
                labelPlaceholder='Email'
                initialValue='Email'
                onChange={handleEmail}
                value={email} />
            <Spacer />
            <Input.Password 
                clearable color='secondary' 
                bordered 
                labelPlaceholder='Password'
                initialValue='password'
                value={password}
                onChange={handlePassword}/>
        </Row>
        <Spacer />
        <Button bordered color='secondary' 
            onPress={handleLoginSubmit} auto>
            Login
        </Button>
    </div>
  )
}

export default CommentLogin