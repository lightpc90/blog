import React from 'react'
import { Text, Link, Container, Spacer, Row, Divider, Button, Grid } from '@nextui-org/react'

const DashboardPublishPost = ({postLoading, publishedPost, index}) => {
  return (
    <Container css={{p:0}} key={index}>
        {!postLoading?(
        <>
            <Text align='right'>{publishedPost.created}</Text>
        <Link href={`/Post/${publishedPost.id}?author=${publishedPost.author}`}>
            <Row>
                <Text>
                    {index+1}.
                </Text>
                <Spacer x={.3}/>
                <Text color='secondary'>
                    {publishedPost.title}
                </Text>
            </Row>    
        </Link>
        <Spacer y={.5}/>
        <Grid.Container gap={1}>
            <Grid>
                <Button bordered color='gradient' auto>Update</Button>
            </Grid>
            <Grid>
                <Button bordered color='secondary' auto>Pull Down</Button>
            </Grid>
            <Grid>
                <Button color='error' auto>Delete</Button>
            </Grid>
        </Grid.Container>
        
        <Spacer y={.5}/>
        <Divider />
        </>
        ):(<>
        {/** component to load when loading drafts */}
        <Row css={{height: '100%', top: '$15'}} justify='center'><Loading type='points' color="secondary"/></Row>
        </>)}
        
    </Container>
  )
}

export default DashboardPublishPost