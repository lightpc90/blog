import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { Grid, Text, Row, Card, Divider, Button, Spacer, Container, Avatar } from '@nextui-org/react'
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

  useEffect(()=>{
    const fetchPosts = async() => {
        const {result, error} = await getPosts()
        if (!!result){
          setPosts(result.docs.map((post)=>{
            console.log('value of each post', post.data())
            return{...post.data(), id:post.id}
          }))
        }
        console.log('error', error)
    }
    fetchPosts()
    console.log('contents of posts: ',posts)
  }, [])
  

  return (
    <>
      <Layout>
        <Container>
          {user?(<>
          <LoginAvatar user={user}/>
          </>):(<></>)}
        
        
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
              <Button color='secondary' auto>
                Create a Post
              </Button>
            </Link> 
          </Row>
          <Spacer/>
          <Container > {posts?.map((post)=>{
            return(<PostListCard post = {post} />)    
          })} 
          </Container>
          
          
        </Grid.Container>
        </Container>
      
      </Layout>
       
    </>
  )
}
