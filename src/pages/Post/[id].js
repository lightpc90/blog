import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CommentList from '@/components/commentList'
import NewComment from '@/components/newComment'
import {Grid, Text, Container, Card, Spacer, Divider, Loading, Image} from '@nextui-org/react'
import getAPost from '@/firebase/getAPost'
import Layout from '@/components/Layout'

const PostPage = () => {
  const [post, setPost] = useState({})
  const router = useRouter()
  const {id} = router.query

  useEffect(()=>{
    const fetchPost =async ()=>{
      const {result, error} = await getAPost(id)
      if(!!result){
        setPost(result.data())
      }
    }

    if (id){fetchPost()}
   
  }, [id])

  if (!post){
    return(<Loading color="secondary">Secondary</Loading>)
  }


  return (
    <>
    <Layout>
    <Container>
          <Text weight='bold' size={25} color='secondary'>{post.title}</Text>
          <Image src={post.postImage.downloadURL} alt='post image'/>
          <Spacer/>
          <Text>post.description</Text>
          <Spacer />
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
       
        <Card css={{}}>
          <Card.Body>
            <NewComment postId={id} />
            <Spacer />
            <Text weight='bold' align='center'>Comments</Text>
            <Spacer y={.5}/>
            <Container><Divider /></Container>
            <CommentList postId={id} />
          </Card.Body>
        </Card>
      </Container>
    </Layout>
    </>
  )
}

export default PostPage