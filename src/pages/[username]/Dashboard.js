import React, { useEffect, useState } from 'react'
import { Container, Grid, Button, Collapse, Row, Input, Text, Avatar, Col, Spacer, Link } from '@nextui-org/react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { useAuthContext } from '@/context/AuthContext'
import {AiFillEdit} from 'react-icons/ai'
import ProfileEdit from '@/components/ProfileEdit'
import GetUserAuth from '@/firebase/auth/getUserAuth'
import {FcAbout} from 'react-icons/fc'
import {MdEmail, MdContactPhone} from 'react-icons/md'


const Dashboard = () => {
    const {user} = useAuthContext()
    const router = useRouter()
    const {username} = router.query
    const [_username, _setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userBio, setUserBio ] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [registeredWithEmail, setRegisteredWithEmail] = useState(false)
    const [registeredWithPhone, setRegisteredWithPhone] = useState(false)
    
    const setUserInfo =async()=>{
        if(user.username){_setUsername(user.username)}
        else{_setUsername('Not Set')}

        const {isEmailProviderLinked, isPhoneProviderLinked} = await GetUserAuth()
       {/** user registered with email or email has already been updated*/}
        if (isEmailProviderLinked){
            setRegisteredWithEmail(true)
            setEmail(user.email)
        }
        else if(user.email){setEmail(user.email)}

        {/** user registered with phone or phone has already been updated*/}
        if(isPhoneProviderLinked){
            setRegisteredWithPhone(true)
            setPhone(user.phone)
        }
        else if(user.phone){setPhone(user.phone)}

        if(user.firstName){setFirstName(user.firstName)}
        else{setFirstName('Not set')}

        if(user.lastName){setLastName(user.lastName)}
        else{setLastName('Not set')}

        if(user.userBio){setUserBio(user.userBio)}
        else{setUserBio('Not set')}
    }

    useEffect(()=>{
        setUserInfo()
    },[])

    const handleEditing = ()=>{
        setIsEditing(true)
    }
  return (
    <Layout>
        <Container css={{'@md':{px:400}}}>
        <Col align='center'>
            <Avatar src='/images/avatar_dp.jpg'
            color='secondary'
            size='lg'
            bordered/>
            <Text weight='bold'>Hi, {_username}</Text>
        </Col>

        <Spacer/>
    
        {isEditing?(
            <>
             <ProfileEdit 
             email={email}
             setEmail={setEmail} 
             phone={phone}
             setPhone = {setPhone} 
             firstName={firstName}
             setFirstName={setFirstName}
             lastName={lastName}
             setLastName={setLastName}
             userBio={userBio}
             setUserBio={setUserBio}
             setIsEditing={setIsEditing}
             registeredWithEmail={registeredWithEmail}
             registeredWithPhone={registeredWithPhone}/>
            </>):(
            <>
            <Row justify='center'>
                <Button onPress={handleEditing} color='secondary' bordered auto>Edit Profile</Button>
            </Row>
            
            <Spacer/>
            <Container>
            <Col justify='center'>
                <Row justify='center'>
                    <Text size={20}>
                        <FcAbout/>
                    </Text>
                    <Text color='secondary' weight='bold' align='center'>
                        Bio 
                    </Text>
                </Row>
                
                <Text align='center'>
                    {userBio}
                </Text>
            </Col>
            </Container>
            
            <Spacer y={6}/>
            <Container gap={2} display='flex' direction='column' css={{p:0}}>
                
                <Row  align='center'>
                    <Text color='secondary' size={20} weight='bold'><MdEmail/></Text>
                    <Spacer x={0.3}/>
                    <Text >{email}</Text>
                
                </Row>
                <Row align='center'>
                    <Text color='secondary' weight='bold' size={20}>
                        <MdContactPhone/>
                    </Text>
                    <Spacer x={0.3}/>
                    <Text >{phone}</Text>
                </Row>
                <Row align='center'>
                    <Text color='secondary' weight='bold'>First Name:</Text>
                    <Spacer x={0.3}/>
                    <Text >{firstName}</Text>
                </Row>
                <Row align='center'>
                    <Text color='secondary' weight='bold'>Last Name:</Text>
                    <Spacer x={0.3}/>
                    <Text >{lastName}</Text>
                </Row>
                
            </Container>
            </>)}
             
            <Spacer/>

            {/** Collapse component for draft and published posts */}
            <Text align='center' size={22} weight='bold' color='secondary'> Your Posts</Text> 
            <Container display='inline' gap={2}>
                <Grid  sm={12} md={4}>
                    <Collapse
                    bordered
                    shadow
                    title='Drafts'
                    >
                        <Text>Drafts</Text>
                    </Collapse>
                </Grid>
                <Spacer y={.5}/>
                <Grid sm={12} md={4}>
                    <Collapse
                    bordered
                    shadow
                    title='Published'
                    >
                        <Text>Published</Text>
                    </Collapse>
                </Grid>
            </Container>
        </Container>
    </Layout>
    
  )
}

export default Dashboard