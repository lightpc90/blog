import React, { useState } from 'react'
import signIn from '@/firebase/auth/signIn'
import { Input } from '@nextui-org/react'
import { useRouter } from 'next/router'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPasword] = useState('')

    const router = useRouter()
    const {q} = router.query

    const handleEmail = (e)=>{
        setEmail(e.target.value)
    }
    const handlePassword=(e)=>{
        setPasword(e.target.valeue)
    }
    const handleSubmit = async()=>{
        const {result, error} = await signIn(email, password)
        if(!!result){router.push('/')}
        else{console.log("error: ", error)}
    }
  return (
    <Container align='center' css={{height:"100vh"}}>
        <Card css={{width:"50%", my:"10%", py:'4%'}} >
        <Grid.Container gap={4} direction='column'> 
        <Text color='secondary' weight='bold'>Login</Text>
        <Spacer />
        <Grid>
            <Input
            type='email'
            css={{width:"70%"}} 
            clearable 
            color='secondary' 
            bordered
            required 
            labelPlaceholder='Email'
            onChange={handleEmail}
            value={email} />
        </Grid>
        <Grid>
        <Input.Password
            css={{width:"70%"}} 
            clearable 
            color='secondary' 
            bordered 
            required
            labelPlaceholder='Password'
            onChange={handlePassword}
            value={password} />
        </Grid>
        <Grid>
        <Row>
        <Button bordered 
            color='secondary' 
            auto
            onPress={handleSubmit}>
            Login
        </Button>
        <Text>Not Registered?</Text>
        <link href='/Register'>Sign Up</link>
        </Row>
        
        </Grid> 
     </Grid.Container>
    </Card>
    </Container>
  )
}

export default Login