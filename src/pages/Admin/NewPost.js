import React, {useState} from 'react'
import {Grid, Input, Text, Button, Row, Textarea, Card, Col} from '@nextui-org/react'
import AddPost from '@/firebase/AddPost'


const NewPost = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handleSubmit = async() => { 
        const Post = {title: title, content: content}
        const {result, error} = await AddPost(Post)
    }


  return (
    <Grid.Container gap={4} css={{ paddingLeft:50, paddingRight:50 }} justify='center' >
        <Grid md={12}> <Text weight='bold'>Admin Page to Add A New Post</Text></Grid>
         <Card css={{width:3000, }}>
            <Card.Header>
                <Card.Divider>
                <Text color='secondary'>Add A New Post</Text>
                </Card.Divider> 
            </Card.Header>
            
            <Card.Body>    
                <Grid.Container gap={2} >
                    <Grid xs={12} sm={12} md={12}>
                        <Input
                            css={{ width: 1000}}
                            bordered
                            placeholder='Your Post Title Here!'
                            color='secondary'
                            name='title'
                            aria-label='title'
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    </Grid>

                    <Grid md={12} xs={12} sm={12}>
                        <Row>
                        <Textarea
                            css={{width: 1000}}
                            placeholder='Your Post content here...'
                            bordered
                            aria-label='content'
                            color='secondary'
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                        />
                        </Row>  
                    </Grid>
                    </Grid.Container>    
                <Grid md={12} xs={12} sm={12}>
                 <Button  
                    color='secondary'  
                    type="submit" auto 
                    onPress={handleSubmit}>
                     Add Post
                 </Button>
                </Grid> 
            </Card.Body>
            <Card.Footer>
                <Card.Divider />
            </Card.Footer>
        </Card>

    </Grid.Container>
  )
}

export default NewPost