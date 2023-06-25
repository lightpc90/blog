import React, {useState, useContext, useEffect} from 'react'
import { useRouter } from 'next/router'
import {Grid, Input, Loading, Text, Image, Button, Row, Textarea, Spacer, Card, Col, Container} from '@nextui-org/react'
import AddPost from '@/firebase/AddPost'
import TextEditor from '@/components/TextEditor'
import Layout from '@/components/Layout'
import { AuthContext } from '@/context/AuthContext'
import capitalizeFirstLetter from '@/helperFunctions/capitalizeFirstLetter'
import { sanitizeHtml } from '@/helperFunctions/sanitizeEditorContent'
import SaveFileToStorage from '@/firebase/saveFileToStorage'
import PostPreview from '@/components/postPreview'
import LoginAvatar from '@/components/loginAvatar'



const NewPost = () => {
    const {user, ctxLoaded, setUpdateCtxPosts} = useContext(AuthContext)
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [postImage, setPostImage] = useState(null)
    const [imageURL, setImageURL] = useState(null)
    const [content, setContent] = useState({})
    const [isCreating, setCreating] = useState(true)
    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(true)
    const [saveLoading, setSaveLoading] = useState(false)
    const [postStatus, setPostStatus] = useState('')

    {/** function to run when page mounted */}
    useEffect(()=>{
        const checkUser =()=>{
            if(user==null){
                router.push('/Login')
            }
        }
        if(ctxLoaded){
            checkUser()
            setLoading(false)
        }
        
    }, [ctxLoaded])

    {/** function to handle editor change */}
    const handleEditorChange = (value) => {
        setContent(value) 
    }
    const handleFile=(e)=>{
        setPostImage(e.target.files[0])
    }

    {/** useEffect to handle post image upload */}
    useEffect(()=>{
        const imagePreview =()=>{
            setImageURL( URL.createObjectURL(postImage))
        }
        if(postImage){
            imagePreview()
        }
    }, [postImage])

    const handlePreview =()=>{
        if(postImage){
            setPost({title: capitalizeFirstLetter(title).fullSentence,  description: capitalizeFirstLetter(description).fullSentence,  content: sanitizeHtml(content).__html, PreviewPostImage: imageURL })
            setCreating(false)
        }
        
    }
    const handleEdit=()=>{setCreating(true)}

    const handleSavePost = async(status) => {
       setPostStatus(status)
        setSaveLoading(true)
        const {downloadURL, fileName} = await SaveFileToStorage(postImage)
        const {__html} = sanitizeHtml(content)
        const PostToDb = {status: status, title: title,  description: description, postImage: {downloadURL: downloadURL, fileName: fileName},  content: __html, author: user.id}
        const {result, error} = await AddPost(PostToDb)
        if (!!result){ 
            console.log('result: ',result)
            const id = result.id
            console.log("id: ",id)
            router.push(`/Post/${id}?author=${user.username}`)
        }
        else{console.log('error from saving post to dp: ', error)}
        setUpdateCtxPosts(true)
        setSaveLoading(false)
         

    }


  return (
    <>
         {!loading?(<>
            <Layout>
            {user?.username?(
          <LoginAvatar user={user}/>
          ):(<></>)}

                {isCreating?( <Grid.Container gap={4} css={{ '@md': {paddingLeft:200, paddingRight:200} }} justify='center' >
            <Grid md={12}> <Text size={16} weight='bold'>Blogger Page: Create A Post</Text></Grid>
            <Card css={{width:3000, }}>
                <Card.Header>
                    <Spacer y={3}/>
                    <Card.Divider>
                    <Text color='secondary' weight='bold'>Add A New Post</Text>
                    </Card.Divider> 
                </Card.Header>
                
                <Card.Body>    
                    <Grid.Container gap={2} >
                        <Grid xs={12} sm={12} md={12}>
                            <Col>
                            <Text color='secondary' weight='bold'>Post Title</Text>
                            <Input
                                css={{ width: '60%'}}
                                bordered
                                placeholder='Your Post Title Here!'
                                color='secondary'
                                name='title'
                                aria-label='title'
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                            </Col>
                        </Grid>
                        <Grid md={12} xs={12} sm={12}>
                            <Col>
                            <Text color='secondary' weight='bold'>Post Image</Text>
                            <Input type="file" onChange={handleFile} />
                            <Text color='error'>Not exceed 3mb of Image size!</Text>
                            </Col>  
                        </Grid>
                        <Container>{postImage? (<Image src={imageURL} alt='blog image'/>):(<></>) }</Container>


                        <Grid md={12} xs={12} sm={12}>
                            <Col>
                            <Text color='secondary' weight='bold'>Post Desciption</Text>
                            <Textarea
                                css={{width: '60%'}}
                                placeholder='Your Post desciption here!'
                                bordered
                                aria-label='description'
                                color='secondary'
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            />
                            </Col>  
                        </Grid>
                        <Grid md={12} xs={12} sm={12}>
                            <Col>
                            <Text color='secondary' weight='bold'>Post Contents</Text>
                            <TextEditor
                                css={{width: '60%'}}
                                value={content}
                                onChange={handleEditorChange}
                            />
                            </Col>  
                        </Grid>
                        </Grid.Container>    
                    <Grid md={12} xs={12} sm={12}>
                    <Button  
                        color='secondary'  
                        type="submit" auto 
                        onPress={handlePreview}>
                        Preview
                    </Button>
                    </Grid> 
                </Card.Body>
                <Card.Footer>
                    <Card.Divider />
                </Card.Footer>
            </Card>

        </Grid.Container>
        
        ):(
            <PostPreview post={post} handleEdit={handleEdit} handleSavePost={handleSavePost} saveLoading={saveLoading} postStatus={postStatus}/>
        )}
    </Layout>
</>):(<Row css={{height: '400px'}} align='center' justify='center'><Loading color="secondary" /></Row>)

}
    </>
  )
}

export default NewPost