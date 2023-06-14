import React, { useState } from 'react'
import signIn from '@/firebase/auth/signIn'
import { Input, Container, Card, Grid, Spacer, Row, Button, Link, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPasword] = useState('')
    const [isError, setError] = useState(false)

    const router = useRouter()
    const {q} = router.query

    const handleEmail = (e)=>{
        setError(false)
        setEmail(e.target.value)
    }
    const handlePassword=(e)=>{
        setError(false)
        setPasword(e.target.valeue)
    }
    const handleSubmit = async()=>{
        const {result, error} = await signIn(email, password)
        if(!!result){router.push('/')}
        else{
            console.log("error: ", error)
            setError(true)
    }
    }
  return (
    <Layout>
        <Spacer />
        <Container align='center' css={{height:"100vh"}}>
        <Card css={{ '@sm': {}, '@md':{width:"50%", my:"10%", py:'4%',}
        }} >
        <Grid.Container gap={4} direction='column'
            css={{'@sm': {width:'100%'}}}>
        <Spacer /> 
        <Text color='secondary' size={20} weight='bold'>Login</Text>
        <Spacer />
        {isError?(<Text color='error'>Wrong Email/Password!</Text>):(<></>)}
        <Spacer/>
        <Grid >
            <Input
            type='email'
            css={{width:"80%", }} 
            clearable 
            color='secondary' 
            bordered
            required 
            labelPlaceholder='Email'
            onChange={handleEmail}
            value={email}  />
        </Grid>
        <Grid>
        <Input.Password
            css={{width:"80%"}} 
            clearable 
            color='secondary' 
            bordered 
            required
            labelPlaceholder='Password'
            onChange={handlePassword}
            value={password} />
        </Grid>
        <Grid>
        <Button css={{width:"60%"}} bordered 
            color='secondary' 
            auto
            onPress={handleSubmit}>
            Login
        </Button>
        <span> <Text>Not Registered?</Text>
        <Link href='/Register' ><Text color='secondary'>SignUp</Text></Link> </span>
        
        </Grid> 
     </Grid.Container>
    </Card>
    </Container>
    </Layout>
    
  )
}

export default Login