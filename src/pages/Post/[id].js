import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CommentList from '@/components/commentList'
import NewComment from '@/components/newComment'
import {Grid, Text, Container, Row, Card, Spacer, Divider, Loading} from '@nextui-org/react'
import getAPost from '@/firebase/getAPost'
import Layout from '@/components/Layout'
import { useAuthContext } from '@/context/AuthContext'
import LoginAvatar from '@/components/loginAvatar'
import Comments from '@/components/comments'

const PostPage = () => {
  const [post, setPost] = useState({})
  const [blogUrl, setBlogUrl] = useState('')
  const [postAuthor, setPostAuthor] = useState('')
  const {user} = useAuthContext()
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState([])
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
      setComments(result.data().comments)
    }
  }

  useEffect(()=>{
    fetchPost()
    if(user && user.username === author){setPostAuthor('My Post')}
    else{setPostAuthor(author)}
    setLoading(false)
  }, [comments])


  return (
    <>
    <Layout>
    {user?.username?(
          <LoginAvatar user={user}/>
          ):(<></>)}
    {loading?(<Loading type='spinner' color="secondary"/>):(<>
      <Container css={{'@md':{px:300}}}>
      <Spacer />
      <Container css={{p:'$2', backgroundColor:"#f0f0f0"}}>
          <Row gap={2}>
            <Text weight='bold'>Author:</Text>
            <Spacer x={.3}/>
            <Text >{postAuthor}</Text>
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