import React from 'react'
import Layout from '@/components/Layout'
import { Container, Text, Spacer, Link } from '@nextui-org/react'

const About = () => {
  return (
    <Layout>
        <Container css={{p:'$10'}}>
          <Text color='secondary' weight='bold' align='center'>About</Text>
          <Text>This page is being worked on. <Link href='/'>Come back later</Link></Text>
          <Spacer y={.5}/>
          <Text color='secondary'>Meanwhile, below is a basic information about this Web App</Text>
            <Text blockquote >
                This web App is basically created to inform the public of any project <Link href='/'>24Codelabz</Link> is working on. 
                But extended features was added along the way to give the users a free platform to create and style their own blog the way they want
            </Text>
         </Container>
    </Layout>
  )
}

export default About