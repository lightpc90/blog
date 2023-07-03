import React, { useEffect, useState } from 'react'
import { Container, Grid, Divider, Loading, Button, Collapse, Row, Input, Text, Avatar, Col, Spacer, Link } from '@nextui-org/react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { useAuthContext } from '@/context/AuthContext'
import {AiFillEdit} from 'react-icons/ai'
import {BsFillBagCheckFill} from 'react-icons/bs'
import ProfileEdit from '@/components/ProfileEdit'
import GetUserAuth from '@/firebase/auth/getUserAuth'
import {FcAbout} from 'react-icons/fc'
import {MdEmail, MdContactPhone} from 'react-icons/md'
import DashboardPublishPost from '@/components/dashboardPublishPost'
import DashboardDraftPost from '@/components/dashboardDraftPost'



const Dashboard = () => {
    const {user, ctxPosts, ctxLoaded} = useAuthContext()
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
    const [drafts, setDrafts] = useState([])
    const [published, setPublished] = useState([])
    const [loading, setLoading] = useState(true)
    const [postLoading, setPostLoading] = useState(true)
    
    

    const handleEditing = ()=>{
        setIsEditing(true)
    }


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

        if(ctxLoaded){
            if(user){setUserInfo()}
            else{router.push('/')}
            setLoading(false) 
        } 
    },[ctxLoaded])


    const AllPosts = ()=>{
        const AllDraft =  ctxPosts.filter((ctxPost)=>{return(ctxPost.author === user.id && ctxPost.status === "Draft")})
        console.log('all draft: ', AllDraft)
        setDrafts(AllDraft)

        const AllPublished =  ctxPosts.filter((ctxPost)=>{return(ctxPost.author === user.id && ctxPost.status === "Published")})
        console.log('all published: ', AllPublished)
        setPublished(AllPublished)
    }

    useEffect(()=>{
        if(ctxPosts.length>0 && user){
            AllPosts()
        }
        else{console.log('ctxPosts is empty')}
        setPostLoading(false)
    }, [ctxPosts])
    

  return (
    <>
        <Layout>
            {!loading?(
            
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
                    <Button css={{zIndex:'1'}} onPress={handleEditing} color='secondary' bordered auto>Edit Profile</Button>
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
                <Divider/>
                <Spacer />
                <Text align='center' size={25} color='secondary'><BsFillBagCheckFill/></Text>
                <Spacer y={1}/>
                
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
                <Spacer y={2}/>
                </>)}
                
                <Spacer/>

                {/** Collapse component for draft and published posts */}
                <Text align='center' size={20} weight='bold' color='secondary'> My Blog Posts</Text>
                <Spacer y={1}/>
                <Container css={{px:'$18'}}><Divider/> </Container>
                
                <Container display='inline' gap={2}>
                    <Grid  sm={12} md={4}>
                        <Collapse
                        bordered
                        shadow
                        title='Drafts'
                        >
                            {drafts.length>0?(
                            <>
                                {drafts.map((draft, index)=>{
                                    return(<DashboardDraftPost ctxPosts={ctxPosts} postLoading={postLoading} draftPost={draft} index={index}/>)
                                })}
                            </>):(
                            <>
                                <Link href={`/Admin/NewPost`}>Create Your First Draft</Link>
                            </>)}
                        </Collapse>
                    </Grid>
                    <Spacer y={.5}/>
                    <Grid sm={12} md={4}>
                        <Collapse
                        bordered
                        shadow
                        title='Published'
                        >
                            {published.length>0?(<>
                                {published.map((publishedPost, index)=>{
                                    return(<DashboardPublishPost ctxPosts={ctxPosts} user={user} postLoading={postLoading} publishedPost={publishedPost} index={index}/>)
                                })}
                            </>):(<>
                                <Link href={`/Admin/NewPost`}>Create Your First Blog</Link>
                            </>)}   
                        </Collapse>
                    </Grid>
                </Container>
            </Container>
            
            ):(
            <>
                <Row css={{height: '400px'}} align='center' justify='center'><Loading color="secondary" /></Row>
            </>
            )}
        </Layout>
    </>      
  )
}

export default Dashboard