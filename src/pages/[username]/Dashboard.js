import React from 'react'
import { Container, Text, Avatar, Col, Spacer, Link } from '@nextui-org/react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'

const Dashboard = () => {
    const router = useRouter()
    const {username} = router.query
  return (
    <Layout>
        <Container>
            <Col align='center'>
                <Avatar src='/images/avatar_dp.jpg'
                color='secondary'
                size='lg'
                bordered/>
                <Text weight='bold'>Hi, {username}</Text>
            </Col>
            <Spacer/>
            <Text>
            Chill, Your Dashboard is being developed. <Link href='/'>Come back later</Link>
            </Text>  
        </Container>
    </Layout>
    
  )
}

export default Dashboard