import React, {useEffect, useState} from 'react'
import { Text, Link, Container, Spacer, Row, Divider, Button, Grid} from '@nextui-org/react'

const DashboardPublishPost = ({user, postLoading, publishedPost, index, ctxPosts}) => {
    const [author, setAuthor] = useState('')

    const fetchAuthor = async()=>{
        if(user.id === publishedPost.author){
          setAuthor('My Post')
        }
        else{
          const {result, error} = await getAUser(publishedPost.author)
          if (result && result.data().username){setAuthor(result.data().username)}
          else if(result){setAuthor(result.data().email)}
          else{console.log('error fetching the author', error)}
        }
      }

      useEffect(()=>{
        fetchAuthor()
      },[ctxPosts])

  return (
    <Container css={{p:0}} key={index}>
        {!postLoading?(
        <>
            <Text align='right'>{publishedPost.created}</Text>
        <Link href={`/Post/${publishedPost.id}?author=${author}`}>
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