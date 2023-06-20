import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {Grid, Text, Loading, Container, Card, Spacer, Divider, Button, Image} from '@nextui-org/react'
import getAPost from '@/firebase/getAPost'
import Layout from '@/components/Layout'

const PostPreview = ({post, handleEdit, handleSavePost, saveLoading, postStatus}) => {

  return (

    <Container css={{'@md':{px:300}}}>
          <Spacer/>
          <Text weight='bold' size={25} color='secondary'>{post.title}</Text>
          <Text>{post.description}</Text>
          <Spacer/>
          <Divider/>
          <Spacer/>
          <div key={post.PreviewPostImage}><Image src={post.PreviewPostImage} alt='post image'/></div>
          <Spacer/>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          <Spacer/>
          <Divider/>
          <Spacer/>
          <Container display='inline'>
            {saveLoading && postStatus==='Draft'? (
            <>
              <Button disabled auto bordered color="primary" css={{ px: "$13" }}>
                    <Loading color="currentColor" size="sm" />
                </Button>
            </>):(
            <>
              <Button bordered color='secondary' onPress={()=>handleSavePost("Draft")} auto>Save as Draft</Button>
            </>)}
            
            <Spacer/>
            <Button bordered color='secondary' onPress={handleEdit} auto>Edit</Button>
            <Spacer/>
            {saveLoading && postStatus==='Published' ?(
            <>
              <Button disabled auto bordered color="primary" css={{ px: "$13" }}>
                    <Loading color="currentColor" size="sm" />
                </Button>
            </>):(
            <>
              <Button color='secondary' onPress={()=>handleSavePost("Published")} auto>Publish</Button>
            </>)}
            
          </Container>
          <Spacer/>
          <Divider/>
      </Container>
  )
}

export default PostPreview