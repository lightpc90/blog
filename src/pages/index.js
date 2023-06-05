import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { Grid, Text, Row, Card, Divider, Button } from '@nextui-org/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import getPosts from '@/firebase/getPosts'
import PostListCard from '@/components/PostListCard'


export default function Home() {

  const description = `This blog site would be used to inform our esteemed community of the updates on our current and past projects`
  const Day1Update = [
    {content: ` We set up the database schemas and connected our blog`},
    {content: ` set up the user authentications`},
    {content: ` we installed all our dependencies, kindly check package.json to see the list`},
    {content: ` we created 3 functions to interract with our database; to fetch all our Posts, fetch a Post by Id, and to save a Post to our database`},
    {content: ` Created the user Context component... will be used later`},
    {content: ` Pushed our genesis commit to github and deploy the app`},
  ]
  const [posts, setPosts] = useState([])

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
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Projects Update Blog</title>
      </Head>
     
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
                Admin Page
              </Button>
            </Link> 
          </Row>
          {posts.map((post)=>{
            return(<PostListCard post = {post} />)    
          })}
        </Grid.Container>
      
    </>
  )
}
