import React from 'react'
import Layout from '@/components/Layout'
import { Link, Container, Spacer, Text } from '@nextui-org/react'
import { FaLessThan } from 'react-icons/fa'

const ReportBug = () => {
  return (
  <Layout>
    <Container>
        <Link href='/'><FaLessThan/> Go Back  </Link>
        <Spacer/>
        <Text weight='bold' color='secondary'>Report a Bug</Text>
        <Text>You have a bug you want to report? Chill, this page is being worked on. while waiting for this page to be ready. kindly use any of the means below to get to me. Thanks</Text>
    </Container>
    
    </Layout>
    )
}

export default ReportBug