import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {Grid, Text, Container, Row, Col, Card, Avatar, Spacer, Divider, Loading} from '@nextui-org/react'
import getAPost from '@/firebase/getAPost'
import getAUser from '@/firebase/user/getAUser'
import Layout from '@/components/Layout'
import { useAuthContext } from '@/context/AuthContext'
import LoginAvatar from '@/components/loginAvatar'
import Comments from '@/components/comments'
import AuthorAvatar from '@/components/AuthorAvatar'

const PostPage = () => {
  const [post, setPost] = useState({})
  const [blogUrl, setBlogUrl] = useState('')
  const {user, ctxPosts, updateCtxPosts} = useAuthContext()
  const [loading, setLoading] = useState(true)
  const [imageLoading, setImageLoading] = useState(true)
  const [comments, setComments] = useState([])
  const [postAuthor, setPostAuthor] = useState('')
  const router = useRouter()
  const {id} = router.query
  const {author} = router.query

  const fetchPost = async ()=>{
      const ctxPost = ctxPosts.find((ctxPost) => ctxPost.id === id);
      console.log('ctxPosts in post page: ', ctxPosts)
      console.log('ctxPost found: ', ctxPost)
      if(!author){
        const {result, error} = await getAUser(ctxPost.author)
        if (!!result){setPostAuthor(result.data().username)}
        else if(error){console.log('error fetching author: ', error)}
      }
      else{setPostAuthor(author)}
      setBlogUrl(ctxPost.postImage.downloadURL)

      //I want the most recent comment at the top
      setComments(ctxPost.comments.reverse())
      setPost(ctxPost)  
  }

  useEffect(()=>{
    if(ctxPosts.length>0){
      fetchPost()
      setLoading(false)
    }
  }, [updateCtxPosts, ctxPosts])

  const handleImageLoad =()=>{
    setImageLoading(false)
  }

  return (
    <>
    <Layout>
    {user?.username?(
          <LoginAvatar user={user}/>
          ):(<></>)}
    {loading?(<Container css={{height: '300px'}} align='center'><Loading type='spinner' color="secondary"/></Container> ):(<>
      <Container css={{'@md':{px:300}}}>
      <Spacer />

        <AuthorAvatar author={author} post={post}/>
          <Text weight='bold' size={25} color='secondary'>{post.title}</Text>
          <Card>
          {imageLoading && <Container align="center"><Loading type="spinner" color='secondary' /></Container> }
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