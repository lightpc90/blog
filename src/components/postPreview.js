import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {Grid, Text, Container, Card, Spacer, Divider, Button, Image} from '@nextui-org/react'
import getAPost from '@/firebase/getAPost'
import Layout from '@/components/Layout'

const PostPreview = ({post, handleEdit, handleSavePost}) => {

  return (

    <Container>
          <Text weight='bold' size={25} color='secondary'>{post.title}</Text>
          <div key={post.PreviewPostImage}><Image src={post.PreviewPostImage} alt='post image'/></div>
          <Spacer/>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          <Container display='flex'>
            <Button onPress={()=>handleSavePost("Draft")} auto>Save as Draft</Button>
            <Button onPress={handleEdit} auto>Edit</Button>
            <Button onPress={()=>handleSavePost("Published")} auto>Publish</Button>
          </Container>
      </Container>
  )
}

export default PostPreview