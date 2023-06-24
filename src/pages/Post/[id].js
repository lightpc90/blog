import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {Grid, Text, Container, Row, Col, Card, Spacer, Divider, Loading} from '@nextui-org/react'
import getAPost from '@/firebase/getAPost'
import Layout from '@/components/Layout'
import { useAuthContext } from '@/context/AuthContext'
import LoginAvatar from '@/components/loginAvatar'
import Comments from '@/components/comments'

const PostPage = () => {
  const [post, setPost] = useState({})
  const [blogUrl, setBlogUrl] = useState('')
  const [postAuthor, setPostAuthor] = useState('')
  const {user, ctxPosts} = useAuthContext()
  const [loading, setLoading] = useState(true)
  const [imageLoading, setImageLoading] = useState(true)
  const [comments, setComments] = useState([])
  const router = useRouter()
  const {id} = router.query
  const {author} = router.query

  const fetchPost =async ()=>{
    if(ctxPosts.length===0){
      const {result, error} = await getAPost(id)
      if(!!result){
        console.log('result object from database in post view', result)
        setPost(result.data())
        console.log('downloadURL in postPage: ', result.data().postImage.downloadURL)
        setBlogUrl(result.data().postImage.downloadURL)
        setComments(result.data().comments)
      }
    }
    else if(ctxPosts.length>0){
      const ctxPost = ctxPosts.find((ctxPost) => ctxPost.id === id);
      console.log('ctxPosts in post page: ', ctxPosts)
      setBlogUrl(ctxPost.postImage.downloadURL)
      setComments(ctxPost.comments)
      setPost(ctxPost)
    }  
  }

  useEffect(()=>{
    fetchPost()
    if(user && user.username === author){setPostAuthor('My Post')}
    else{setPostAuthor(author)}
    setLoading(false)
  }, [comments])

  const handleImageLoad =()=>{
    setImageLoading(false)
  }

  return (
    <>
    <Layout>
    {user?.username?(
          <LoginAvatar user={user}/>
          ):(<></>)}
    {loading?(<Loading type='spinner' color="secondary"/>):(<>
      <Container css={{'@md':{px:300}}}>
      <Spacer />
      <Container css={{p:'$2', }}>
          <Col gap={2}>
            <Row>
            <Text weight='bold'>Author:</Text>
            <Spacer x={.3}/>
            <Text >{postAuthor}</Text>
            </Row>
            <Row>
              <Text weight='bold'>Pulished:</Text>
              <Spacer x={.3}/>
              <Text >{post.created}</Text>
            </Row>
          </Col>
        </Container>
          
          <Text weight='bold' size={25} color='secondary'>{post.title}</Text>
          <Card>
          {imageLoading && <Container justifyItems="center" align="center"><Loading type="spinner" color='secondary' /></Container> }
              <Card.Image src={blogUrl} alt="Image" width="500"
              onLoad={handleImageLoad}/>
          </Card>
          
          <Spacer/>
          <Text>{post.description}</Text>
          
          <Spacer />
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
       
        <Card css={{}}>
          <Card.Body>
            <Comments id={id} setComments={setComments} comments={comments}/>
          </Card.Body>
        </Card>
      </Container>
    </>)}
    
    </Layout>
    </>
  )
}

export default PostPage