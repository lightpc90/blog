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
import FetchPosts from '@/helperFunctions/FetchPosts'
import PostEditModal from '@/components/PostEditModal'
import PostPreviewModal from '@/components/PostPreviewModal'
import Collections from '@/components/Collections'



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

    //modal states managment
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [content, setContent] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [editVisible, setEditVisible] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false)
    const [postImage, setPostImage] = useState(null)
    const [id, setId] = useState('')
    const [status, setStatus] = useState('')
    const [oldContent, setOldContent] = useState({})

    const handleFile=(e)=>{
        setPostImage(e.target.files[0])
    }

    const handleContentChange =(value)=>{
        setContent(value)
    }
    //function to open modal to edit a blog post
    const handleEditingOpenModal=()=>{
        setEditVisible(true)
    }

    const handleEditingCloseModal=()=>{
        setEditVisible(false)
    }

    const handlePreviewOpenModal=()=>{
        setPreviewVisible(true)
    }

    const handlePreviewCloseModal=()=>{
        setPreviewVisible(false)
    }

    const handlePreview =()=>{
        if(title && imageURL && content){
            setEditVisible(false)
            setPreviewVisible(true)
        }   
    }

    const handleBackToEdit =()=>{
        handlePreviewCloseModal()
        handleEditingOpenModal()
      }
    

    const handleUpdateButton=(postId)=>{
        const postToUpdate = ctxPosts.find((ctxPost)=>{return(ctxPost.id === postId)})
        setOldContent({title: postToUpdate.title, description: postToUpdate.description, content: postToUpdate.content, imageURL: postToUpdate.postImage.downloadURL})
        setStatus(postToUpdate.status)
        setId(postId)
        setTitle(postToUpdate.title)
        setImageURL(postToUpdate.postImage.downloadURL)
        setDescription(postToUpdate.description)
        setContent(postToUpdate.content)
        setEditVisible(true)
        console.log('post image url: ', postToUpdate.postImage.downloadURL)
    }

    const post = {title, setTitle, description, setDescription, content, handleContentChange, imageURL, setImageURL, postImage, setPostImage, id, status}
    const modal = {editVisible, setEditVisible, previewVisible, setPreviewVisible}
    const handleFunctions = {handleEditingOpenModal, handleEditingCloseModal, handlePreviewOpenModal, handlePreviewCloseModal, handlePreview, handleFile, handleUpdateButton, handleBackToEdit}
    
//function to edit user basic info
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

    useEffect(()=>{
        if(ctxPosts.length>0 && user){
            FetchPosts('', ctxPosts, user, setDrafts, setPublished)
        }
        else{console.log('ctxPosts is empty')}
        setPostLoading(false)
    }, [ctxPosts])
    

  return (
    <>
        <Layout>

            {editVisible && <PostEditModal post={post} modal={modal} handleFunctions={handleFunctions} />}

            {previewVisible && <PostPreviewModal post={post} modal={modal} handleFunctions={handleFunctions} oldContent={oldContent} />}
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

                <Collections />
                
                <Spacer/>

                {/** Collapse component for draft and published posts */}
                <Text align='center' size={20} weight='bold' color='secondary'> My Blog Posts</Text>
                <Spacer y={0.5}/>
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
                                    return(<DashboardDraftPost ctxPosts={ctxPosts} postLoading={postLoading} draftPost={draft} index={index} allDrafts={drafts} setDrafts={setDrafts} setEditVisible={setEditVisible} handleUpdateButton={handleUpdateButton} />)
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
                                    return(<DashboardPublishPost ctxPosts={ctxPosts} user={user} postLoading={postLoading} publishedPost={publishedPost} index={index} allPublished={published} setPublished={setPublished} handleUpdateButton={handleUpdateButton} />)
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