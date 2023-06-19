import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CommentList from '@/components/commentList'
import NewComment from '@/components/newComment'
import {Grid, Text, Container, Row, Card, Spacer, Divider, Loading} from '@nextui-org/react'
import getAPost from '@/firebase/getAPost'
import Layout from '@/components/Layout'
import getAUser from '@/firebase/user/getAUser'
import { useAuthContext } from '@/context/AuthContext'

const PostView = () => {
  const {user} = useAuthContext()
  const [post, setPost] = useState({})
  const [blogUrl, setBlogUrl] = useState('')
  const [author, setAuthor] = useState('')
  const router = useRouter()
  const {id} = router.query

  useEffect(()=>{
    const fetchPost =async ()=>{
      const {result, error} = await getAPost(id)
      if(!!result){
        console.log('result object in post view', result)
        setPost(result.data())
        console.log('downloadURL in postPage: ', result.data().postImage.downloadURL)
        setBlogUrl(result.data().postImage.downloadURL)
      }
    }

    fetchPost()

    const fetchAuthor =async()=>{
      if(user && user.id === post.author){
        setAuthor('My Post')
      }
      else{
        const {result, error} = await getAUser(post.author)
        if (result && result.data().username){setAuthor(result.data().username)}
        else if(result){setAuthor(result.data().email)}
        else{console.log('error fetching the author', error)}
      }
    }
    if(post.author){fetchAuthor()}
  }, [])


  if (!post){
    return(<Loading color="secondary">Secondary</Loading>)
  }



  return (
    <>
    <Layout>
    <Container css={{'@md':{px:300}}}>
      <Spacer />
      <Container css={{p:'$2', backgroundColor:"#f0f0f0"}}>
          <Row gap={2}>
            <Text weight='bold'>Author:</Text>
            <Spacer x={.3}/>
            <Text >{author}</Text>
            <Spacer x={.3}/>
            <Text weight='bold'>Pulished:</Text>
            <Spacer x={.3}/>
            <Text >{post.created}</Text>
          </Row>
        </Container>
          
          <Text weight='bold' size={25} color='secondary'>{post.title}</Text>
          <Card>
              <Card.Image src={blogUrl} alt="Image" width="500"/>
          </Card>
          
          <Spacer/>
          <Text>{post.description}</Text>
          
          <Spacer />
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
       
        <Card css={{}}>
          <Card.Body>
            <NewComment postId={id} />
            <Spacer />
            <Text weight='bold' align='center'>Comments</Text>
            <Spacer y={.5}/>
            <Container><Divider /></Container>
            {post.comments?.map((comment)=>{
              return(<CommentList comment={comment} />)  
            })} 
          </Card.Body>
        </Card>
      </Container>
    </Layout>
    </>
  )
}

export default PostView