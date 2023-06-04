import React from 'react'
import Comments from '@/components/Comments'
import {Grid, Text, Card} from '@nextui-org/react'

const PostPage = () => {
  return (
    <>
        <Grid.Container gap={4}>
            A dynamic Page to show the contents of a Post
        </Grid.Container>
        <Comments />
    </>
  )
}

export default PostPage