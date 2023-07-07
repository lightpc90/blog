import React, {useState, useEffect} from 'react'
import { Modal, Button, Text, Divider, Spacer, Image, Grid, Card, Container, Input, Col, Textarea,  } from "@nextui-org/react";
import TextEditor from './TextEditor';

const PostEditModal = ({post, modal, handleFunctions}) => {

   {/** useEffect to handle post image upload */}
   useEffect(()=>{
    const imagePreview =()=>{
      post.setImageURL( URL.createObjectURL(post.postImage))
    }
    if(post.postImage){
      console.log('post image in effect: ', post.postImage)
      imagePreview()
    }
}, [post.postImage])
 
  return (
    <div>
      <Modal
        open={modal.editVisible}
        scroll
        fullScreen
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Modal.Header>
          <Spacer y={3}/>
          <Divider>
          <Text color='secondary' weight='bold'>Editing Post...</Text>
          </Divider>
        </Modal.Header>
        <Modal.Body>
          <Container>
              <Grid xs={12} sm={12} md={12}>
                <Col>
                <Text color='secondary' weight='bold'>Post Title *</Text>
                <Input
                    css={{ width: '60%'}}
                    bordered
                    placeholder='Your Post Title Here!'
                    color='secondary'
                    name='title'
                    aria-labelledby='post-title'
                    onChange={(e) => post.setTitle(e.target.value)}
                    value={post.title}
                />
                </Col>
            </Grid>
            <Grid md={12} xs={12} sm={12}>
                <Col>
                <Text color='secondary' weight='bold'>Post Image *</Text>
                <Input type="file" onChange={handleFunctions.handleFile} />
                <Text color='error'>Not exceed 3mb of Image size!</Text>
                </Col>  
            </Grid>
            <Container css={{p:0}}> {post.imageURL?(
              <Card>
                  <Card.Image objectFit='cover' width='100%' src={post.imageURL} alt='blog image'/>
              </Card>
            ):(<></>) }
            </Container>


            <Grid md={12} xs={12} sm={12}>
                <Col>
                <Text color='secondary' weight='bold'>Post Desciption (optional)</Text>
                <Textarea
                    css={{width: '60%'}}
                    placeholder='Your Post desciption here!'
                    bordered
                    aria-labelledby='description'
                    color='secondary'
                    onChange={(e) => post.setDescription(e.target.value)}
                    value={post.description}
                />
                </Col>  
            </Grid>
            <Grid md={12} xs={12} sm={12}>
                <Col>
                <Text color='secondary' weight='bold'>Post Contents *</Text>
                <TextEditor
                    aria-labelledby='text-editor'
                    value={post.content}
                    onChange={post.handleContentChange}
                />
                </Col>  
            </Grid>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button flat auto size='sm' color="error" onPress={handleFunctions.handleEditingCloseModal}>
            Close
          </Button>
          <Button auto shadow size='sm' color='secondary' bordered onPress={handleFunctions.handlePreview}>Preview</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PostEditModal