import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CommentList from '@/components/commentList'
import NewComment from '@/components/newComment'
import {Grid, Text, Container, Card} from '@nextui-org/react'
import getAPost from '@/firebase/getAPost'

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
    return(<div>Loading...</div>)
  }


  return (
    <>
      <Container>
          <Text weight='bold' size={30} color='secondary'>{post.title}</Text>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
       
        <Card css={{}}>
          <Card.Body>
            <NewComment postId={id} />
            <CommentList postId={id} />
          </Card.Body>
        </Card>
      </Container>
      
      
    </>
  )
}

export default PostPage