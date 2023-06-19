import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { Grid, Text, Row, Card, Divider, Button, Loading, Spacer, Container, Avatar, StyledLoadingContainer } from '@nextui-org/react'
import Link from 'next/link'
import { useEffect, useState, useContext } from 'react'
import getPosts from '@/firebase/getPosts'
import PostListCard from '@/components/PostListCard'
import Layout from '@/components/Layout'
import { AuthContext } from '@/context/AuthContext'
import LoginAvatar from '@/components/loginAvatar'


export default function Home() {

  const description = `This blog site would be used to inform our esteemed community of the updates on our current and past projects`
  const [posts, setPosts] = useState([])
  const {user} = useContext(AuthContext)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const fetchPosts = async() => {
        const {result, error} = await getPosts()
        if (!!result){
          setPosts(result.docs.map((post)=>{
            console.log('value of each post', post.data())
            console.log('value of downloadURL', post.data().postImage.downloadURL)
            return{...post.data(), id:post.id}
          }))
          
        }
        setLoading(false)
        console.log('error', error)
    }
    fetchPosts()
  }, [])
  

  return (
    <>
      <Layout>
        
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
            <Text >
              {description}
            </Text>
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
            {!loading?(<>
              {posts.map((post)=>{
            return(<PostListCard post = {post} />)    
            })}
            </>):(<>
              <Row css={{height: '100%', top: '$5'}} justify='center'><Loading color="secondary">Loading</Loading></Row>
            </>)}  
          </Container >
        </Grid.Container>
        </Container>
      
      </Layout>
       
    </>
  )
}
