import React, { useState } from 'react'
import { Input, Col, Loading, Row, Container, Spacer, Button, Text } from '@nextui-org/react'
import { useAuthContext } from '@/context/AuthContext'
import IsValidEmail from '@/helperFunctions/isValidEmail'
import IsValidPhoneNumber from '@/helperFunctions/isValidPhoneNumber'
import UpdateUser from '@/firebase/user/updateUser'
import {FcAbout} from 'react-icons/fc'

const ProfileEdit = ({email, setEmail, phone, setPhone, firstName, setFirstName, lastName, setLastName, userBio, setUserBio, setIsEditing, registeredWithEmail, registeredWithPhone}) => {
    const {user} = useAuthContext()
    const [emailError, setEmailError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleEmail = (e)=>{
        setEmailError('')
        setEmail(e.target.value)
    }
    const handlePhone =(e)=>{
        setPhoneError('')
        setPhone(e.target.value)
    }
    const handleFirstName =(e)=>{
        setFirstName(e.target.value)
    }
    const handleLastName = (e)=>{
        setLastName(e.target.value)
    }
    const handleBio =(e)=>{
        setUserBio(e.target.value)
    }

    const handleCancel =()=>{
        setIsEditing(false)
    }

    const handleUpdate =async()=>{
        console.log('beginning of user updating...')
        setLoading(true)
        const userUpdate = { id: user.id, firstName: firstName, lastName: lastName, userBio: userBio}
        if(!registeredWithEmail){
            const validEmail = IsValidEmail(email)
            if(!validEmail){setEmailError('Email not valid!')}
            else{userUpdate.email = email}
        }
        if(!registeredWithPhone){
            const invalidPhone = isNaN(phone)
            if(invalidPhone){setPhoneError('Phone Number not valid')}
            else{userUpdate.phone = phone}
        }
        
        const {error} = await UpdateUser(userUpdate)
        if(error){
            setLoading(false)
            console.log('error updating user: ', error)
            alert('error updating user: ', error)
        }
        else{
        setLoading(false)
        console.log('user info successfully updated: ')
        setIsEditing(false)
        }
        setLoading(false)

        
    }

  return (
    <div> 
        
        <Container display='inline' justify='center'>

            {/** input to edit user bio */}
            <Row align='center'>
                <Text weight='bold' color='secondary' align='center'>
                 Bio:
                </Text>
                <Input 
                aria-label='user bio'
                clearable
                underlined
                onChange={handleBio} 
                value={userBio}/>
            </Row>
        <Spacer/>
        </Container>

        <Spacer/>
        <Container gap={2} display='flex' direction='column' css={{p:0}}>

            {/** enables email editing if user did not sign up with email */}
            {!registeredWithEmail && <>
                <Row align='center'>
                <Text color='secondary' weight='bold'>Email:</Text>
                <Input
                aria-label='email'
                clearable
                type='email' 
                underlined 
                value={email}
                onChange={handleEmail}/>
            </Row>
            <Text color='error'>{emailError}</Text>
            </>}
            
            {/** enables phone editing if user did not sign up with phone */}
            {!registeredWithPhone && <>
                <Row align='center'>
                <Text color='secondary' weight='bold'>Phone:</Text>
                <Input
                    aria-label='phone'
                    clearable 
                    underlined 
                    type='number'
                    value={phone}
                    onChange={handlePhone}/>
            </Row>
            <Text color='error'>{phoneError}</Text>
            </>}
            
            {/** input to edit user First name */}
            <Row align='center'>
                <Text color='secondary' weight='bold'>First Name:</Text>
                <Input 
                    aria-label='firstName'
                    clearable 
                    underlined 
                    onChange={handleFirstName}
                    value={firstName}/>
            </Row>

            {/** input to edit user Last name */}
            <Row align='center'>
                <Text color='secondary' weight='bold'>Last Name:</Text>
                <Input 
                    aria-label='lastName'
                    clearable
                    underlined 
                    value={lastName}
                    onChange={handleLastName}/>
            </Row>
            <Spacer/>
            {/** conditional render of button */}
            <Row>
                {loading?(
                <>
                    <Button disabled auto bordered color="primary" css={{ px: "$13" }}>
                        <Loading color="currentColor" size="sm" />
                    </Button></>):(
                <>
                    <Button onPress={handleUpdate} bordered color='secondary' auto>Update</Button>
                </>)}
                <Spacer x={.3}/>
                <Button onPress={handleCancel}  color='secondary' auto>Cancel</Button>  
            </Row>
            
        </Container>
    </div>
  )
}

export default ProfileEdit