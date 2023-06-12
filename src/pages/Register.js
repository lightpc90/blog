import React, {useState, useContext} from 'react'
import { Input, Text, Button, Spacer, Card, Row, Link, Container, Grid } from '@nextui-org/react'
import signUp from '@/firebase/auth/signUp'
import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/router'


const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [isError, setIsError] = useState(false)
    const router = useRouter()

    const {q} = router.query

    const {user} = useContext(AuthContext)
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
        if(password!==passwordConfirm){
            setIsError(true)
            console.log("pasword not matched!")
        }
        else{
          setIsError(false)  
          const {result, error} = await signUp(email, password)
          if (!!result){
            console.log("user: ",user)
            if(!!q.postId){router.push(`/Post/${q.postId}`)}
            else{router.push('/')} 
        }
        }    
    }
  return (
    <Container align='center' css={{height:"100vh"}}>
        <Card css={{width:"50%", my:"10%", py:'4%'}} >
        <Grid.Container gap={4} direction='column'> 
        <Text color='secondary' weight='bold'>Register</Text>
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
        <Input.Password
            css={{width:"70%"}}
            clearable
            color='secondary'
            bordered
            labelPlaceholder='Confirm Password'
            required
            onChange={handlePasswordConfirm}
            onBlur={handleOnBlur}
            value={passwordConfirm}/>
            {isError?(<Text color='error'>Password not matched!</Text>):(<></>)}
        </Grid>
        <Grid>
        <Row>
        <Button bordered 
            color='secondary' 
            auto
            onPress={handleRegister}>
            Register
        </Button>
        <Text>Registered?</Text>
        <link href='/Login'>Login</link>
        </Row>
        
        </Grid> 
     </Grid.Container>
    </Card>
    </Container>
  )
}

export default Register