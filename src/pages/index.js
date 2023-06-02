import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { Grid, Text, Row, Card, Divider } from '@nextui-org/react'


export default function Home() {

  const description = `This blog site would be used to inform our esteemed community of the updates on our current and past projects`
  return (
    <>
     
        <Grid.Container gap={2} css={{p:40}} >
          <Row justify='center'>
            <Text 
              weight='bold'
              size={20}>Build Men, Build Apps Blog
            </Text>
          </Row>
          <Grid sm={12} md={12} justify='center'>
            <Text >
              {description}
            </Text>
          </Grid>
            <Grid justify='center' xm={12} sm={6} md={4}>
              <Card variant='bordered'>
                <Card.Header>
                  <Text color='secondary' weight='bold'>
                    Day 1
                  </Text>
                </Card.Header>
                <Divider />
                <Card.Body>
                  <Text>1. We set up the database schemas and connected our blog</Text>
                  <Text>2. set up the user authentications</Text>
                  <Text>3. we created 3 functions to interract with our database; to fetch all our Posts, fetch a Post by Id, and to save a Post to our database</Text>
                  <Text>4. Created the user Context component... will be used later</Text>
                </Card.Body>
              </Card>
            </Grid>
        </Grid.Container>
      
    </>
  )
}
