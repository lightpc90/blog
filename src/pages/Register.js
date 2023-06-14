import React, {useState, useContext} from 'react'
import { Input, Text, Button, Spacer, Card, Row, Link, Container, Grid, Loading } from '@nextui-org/react'
import signUp from '@/firebase/auth/signUp'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import AddUser from '@/firebase/user/AddUser'
import capitalizeFirstLetter from '@/helperFunctions/capitalizeFirstLetter'


const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [isError, setIsError] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const {q} = router.query


    const handleUsername=(e)=>{
        setUsername(e.target.value)
    }
    const handleEmail=(e)=>{
        setEmail(e.target.value)
    }
    const handlePassword=(e)=>{
        setPassword(e.target.value)
    }
    const handlePasswordConfirm =(e)=>{
        setPasswordConfirm(e.target.value)
    }
    const handleOnBlur =()=>{
        if(password!==passwordConfirm){
            setIsError(true)
        }
        else{setIsError(false)}
    }
    const handleRegister=async()=>{
        setLoading(true)
        if(password!==passwordConfirm){
            setIsError(true)
            console.log("pasword not matched!")
            setLoading(false)
        }
        else{
          setIsError(false)  
          const {result, error} = await signUp(email, password)
          if (!!result){
            const userDetails = result.user
            userDetails.username = capitalizeFirstLetter(username).fullSentence
            console.log('userDetails got from auth sign up: ', userDetails)
            console.log('getting user id from userDetails: ', userDetails.uid)
            const response = await AddUser(userDetails)
            console.log("data from AddUser response: ", response)
            router.push('/')
        }
        if(error){console.log('error from signing up user', error)}
        setLoading(false)
        }    
    }
  return (
    <Layout>
     <Spacer />
     <Container align='center' css={{height:"100vh"}}>
        <Card css={{'@md':{width:"50%", my:"10%", py:'4%'}}} >
            <Grid.Container gap={4} direction='column'> 
            <Spacer />
            <Text color='secondary' weight='bold'>Register</Text>
            <Spacer />
            <Grid>
                <Input
                type='email'
                css={{width:"80%"}} 
                clearable 
                color='secondary' 
                bordered='true'
                required 
                labelPlaceholder='Email'
                onChange={handleEmail}
                value={email} />
            </Grid>
            <Grid>
            <Input.Password
                css={{width:"80%"}} 
                clearable 
                color='secondary' 
                bordered='true'
                required
                labelPlaceholder='Password'
                onChange={handlePassword}
                value={password} />
            </Grid>
            <Grid>
            <Input.Password
                css={{width:"80%"}}
                clearable
                color='secondary'
                bordered='true'
                labelPlaceholder='Confirm Password'
                required
                onChange={handlePasswordConfirm}
                onBlur={handleOnBlur}
                value={passwordConfirm}/>
                {isError?(<Text color='error'>Password not matched!</Text>):(<></>)}
            </Grid>
            <Grid>
                <Input
                type='text'
                css={{width:"80%"}} 
                clearable 
                color='secondary' 
                bordered='true'
                required 
                labelPlaceholder='Username'
                onChange={handleUsername}
                value={username} />
            </Grid>
            <Grid>
                {loading?(
                <Button disabled auto bordered color="primary" css={{ px: "$13" }}>
                    <Loading color="currentColor" size="sm" />
                </Button>):(
                <Button bordered 
                    css={{width: '60%'}}
                    color='secondary' 
                    auto
                    onPress={handleRegister}>
                    Register
                </Button>)}
            
            <Text>Registered?</Text>
            <Link href='/Login' color='secondary'>Login</Link>
            
            </Grid> 
        </Grid.Container>
        </Card>
    </Container>
    </Layout>
  )
}

export default Register