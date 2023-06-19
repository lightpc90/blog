import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CommentList from '@/components/commentList'
import NewComment from '@/components/newComment'
import {Grid, Text, Container, Row, Card, Spacer, Divider, Loading} from '@nextui-org/react'
import getAPost from '@/firebase/getAPost'
import Layout from '@/components/Layout'

const PostPage = () => {
  const [post, setPost] = useState({})
  const [blogUrl, setBlogUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const {id} = router.query
  const {author} = router.query

  const fetchPost =async ()=>{
    const {result, error} = await getAPost(id)
    if(!!result){
      console.log('result object in post view', result)
      setPost(result.data())
      console.log('downloadURL in postPage: ', result.data().postImage.downloadURL)
      setBlogUrl(result.data().postImage.downloadURL)
    }
  }

  useEffect(()=>{
    fetchPost()
    setLoading(false)
  }, [])


  return (
    <>
    <Layout>
    {loading?(<Loading type='spinner' color="secondary"/>):(<>
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
    </>)}
    
    </Layout>
    </>
  )
}

export default PostPage