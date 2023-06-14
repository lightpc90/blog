import React, {useState, useContext, useEffect} from 'react'
import { useRouter } from 'next/router'
import {Grid, Input, Text, Button, Row, Textarea, Card, Col} from '@nextui-org/react'
import AddPost from '@/firebase/AddPost'
import TextEditor from '@/components/TextEditor'
import Layout from '@/components/Layout'
import { AuthContext } from '@/context/AuthContext'
import capitalizeFirstLetter from '@/helperFunctions/capitalizeFirstLetter'
import { sanitizeHtml } from '@/helperFunctions/sanitizeEditorContent'
import SaveFileToStorage from '@/firebase/saveFileToStorage'
import PostPreview from '@/components/postPreview'



const NewPost = () => {
    const {user} = useContext(AuthContext)
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [postImage, setPostImage] = useState(null)
    const [previewPostImage, setPreviewPostImage] = useState(null)
    const [content, setContent] = useState({})
    const [isCreating, setCreating] = useState(true)
    const [post, setPost] = useState({})

    useEffect(()=>{
        const checkUser =()=>{
            if(user==null){
                router.push('/Login')
            }
        }
        checkUser()
    }, [user])

    const handleEditorChange = (value) => {
        setContent(value) 
    }
    const handleFile=(e)=>{
        setPostImage(e.target.files[0])
    }
    const handlePreview =()=>{
        if(postImage){
            const imageURL = URL.createObjectURL(postImage)
            setPost({title: capitalizeFirstLetter(title).fullSentence,  description: capitalizeFirstLetter(description).fullSentence,  content: sanitizeHtml(content).__html, PreviewPostImage: imageURL })
            setCreating(false)
        }
        
    }
    const handleEdit=()=>{setCreating(true)}

    const handleSavePost = async(status) => {
        const {downloadURL, fileName} = await SaveFileToStorage(postImage)
        const {__html} = sanitizeHtml(content)
        const PostToDb = {status: status, title: capitalizeFirstLetter(title).fullSentence,  description: capitalizeFirstLetter(description).fullSentence, postImage: {downloadURL: downloadURL, fileName: fileName},  content: __html, author: user.uid}
        const {result, error} = await AddPost(PostToDb)
        if (!!result){ 
            console.log('result: ',result)
            const id = result.id
            console.log("id: ",id)
            router.push(`/Post/${id}`)
        }
        console.log('error: ', error) 

    }


  return (
    <Layout>
        {isCreating?( <Grid.Container gap={4} css={{ paddingLeft:50, paddingRight:50 }} justify='center' >
        <Grid md={12}> <Text size={16} weight='bold'>Blogger Page: Create A Post</Text></Grid>
         <Card css={{width:3000, }}>
            <Card.Header>
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
                        </Col>  
                    </Grid>

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

    </Grid.Container>):(
    <PostPreview post={post} handleEdit={handleEdit} handleSavePost={handleSavePost}/>
    )}
       
    </Layout>
  )
}

export default NewPost