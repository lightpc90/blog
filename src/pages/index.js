import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { Grid, Text, Row, Card, Col, Divider, Button, Loading, Spacer, Container, Avatar, StyledLoadingContainer } from '@nextui-org/react'
import Link from 'next/link'
import { useEffect, useState, useContext } from 'react'
import getPosts from '@/firebase/getPosts'
import PostListCard from '@/components/PostListCard'
import Layout from '@/components/Layout'
import { useAuthContext } from '@/context/AuthContext'
import LoginAvatar from '@/components/loginAvatar'


export default function Home() {

  const description = `Welcome to our commuity blog app, where you'll get updates on our past and current projects. 
  You could also use this platform to create your own blog.`
  const description2 = ` and start creating your blog posts. A blog post styled your way!`
  const description3 = `Start creating your blog posts. A blog post styled your way!`
  const {user, ctxPosts, setCtxPosts, ctxLoaded} = useAuthContext()
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])

  //function to fetch from database, though not used for not
  /** 
  const fetchPosts =async()=>{
    const {result, error} = await getPosts()
      if(!!result){
        console.log('posts from database: ', result.docs)
        setCtxPosts(result.docs.map((post)=>{
          return{...post.data(), id:post.id}
        }))
      }
      else{console.log('error fetching from database: ', error)}
    }

    */

// fetch pubished posts
    const fetchPublishedPostsFromCtx = () =>{
      const publishedPosts = ctxPosts.filter((ctxPost)=>{return(ctxPost.status === "Published")})
      console.log('all published posts: ', publishedPosts)
      setPosts(publishedPosts)
    }
    

  useEffect(()=>{
    if(ctxPosts.length>0){
      fetchPublishedPostsFromCtx()
      setLoading(false)  
    }
    //else if(ctxPosts.length===0){fetchPosts()} 
  },[ctxPosts])

  return (
    <>
      {!loading?(
      <>
      <Layout>

        {/** component to display the username of the logged in user */}
        <Container css={{'@md':{px:300}}}>
          {user?.username?(
          <LoginAvatar user={user}/>
          ):(<></>)}
        
        
        <Grid.Container gap={2} css={{p:40}} >
          <Row justify='center'>
            <Text 
              weight='bold'
              size={20}> Blog for Projects Updates
            </Text>
          </Row>
          <Grid sm={12} md={12} justify='center'>
            <Col>
              <Text >
                {description}
              </Text>
              <Spacer/>
              {user?(
              <>
              <Text >
                {description3}
              </Text>
              </>):(
              <>
              <Text >
                <Link href='/Login'>Sign in</Link>{description2}
              </Text>
              </>)}
            
            </Col>
           
          </Grid>
          <Row justify='flex-end'>
            <Link href='/Admin/NewPost'>
              <Button color='secondary' auto css={{zIndex:'1'}}>
                Create a Post
              </Button>
            </Link> 
          </Row>
          <Spacer/>
          <Container css={{p:0}} >

            {/** component to render the list of posts */}
              {posts.map((post, index)=>{
            return(<PostListCard post = {post} index={index} />)    
            })}

        </Container >
        </Grid.Container>
        </Container>
      </Layout>
      </>):(
      <>
        {/** render a loading component while still fetching user data */}
        <Row css={{height: '400px'}} align='center' justify='center'><Loading color="secondary">Loading</Loading></Row>
      </>)}    
    </>
  )
}
