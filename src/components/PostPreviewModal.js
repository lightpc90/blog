import React, {useState} from 'react'
import { Modal, Container, Row, Spacer, Divider, Text, Button, Loading, Image } from '@nextui-org/react'
import PublishOrPullDown from '@/firebase/updatePost'
import { sanitizeHtml } from '@/helperFunctions/sanitizeEditorContent'
import SaveFileToStorage from '@/firebase/saveFileToStorage'

const PostPreviewModal = ({post, modal, handleFunctions, oldContent}) => {
const [updateLoading, setUpdateLoading] = useState(false)

  const updatePost = async(status)=>{
    setUpdateLoading(true)
    let updateData = {}
    //if title is edited
    if(oldContent.title!==post.title){
      console.log(`title changed...old: ${oldContent.title}, new: ${post.title}`)
      updateData.title = post.title
    }
    //if content is edited
    if(oldContent.content!==post.content){
      console.log(`content changed... old: ${oldContent.content}, new: ${post.content}`)
      updateData.content = sanitizeHtml(post.content).__html
    }
    //if description is edited
    if(oldContent.description!==post.description){
      console.log(`description changed... old: ${oldContent.description}, new: ${post.description}`)
      updateData.description = post.description
    }
    //if post image is changed
    if(post.postImage){
      console.log(`oldContent imageURL: ${oldContent.imageURL}, current imageURL: ${post.imageURL}`)
      //save the new image in the storage database
      const {downloadURL, fileName} = await SaveFileToStorage(post.postImage)
      if(downloadURL){
        //if image stored successfully
        updateData.postImage = {downloadURL, fileName}
        console.log('post image successfully updated, new image URL: ', downloadURL)
      }
      else{console.log('post image failed to update...')}  
    }
    if (status === 'Published'){
      const currentDate = new Date();
      const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        day: 'numeric',
        month: 'long',
      };
      const formattedDate = currentDate.toLocaleString('en-US', options);
      updateData.edited = formattedDate
    }
    //update the the post only if any of the post contents is changed, and update only the affected contents
    if(!!updateData){
      const {error} = await PublishOrPullDown(post.id, updateData)
      if(error){console.log(`error updating ${post.title}: `, error)}
      else{console.log(`${post.title} successfully updated...`)}
    } 
    setUpdateLoading(false)
    handleFunctions.handlePreviewCloseModal()
  }

  return (
    <Modal
    open={modal.previewVisible}
    scroll
    fullScreen
    aria-labelledby="post-update-preview"
    aria-describedby="post-update-preview-modal"
    >
      <Modal.Header>
        <Spacer y={3}/>
          <Divider>
          <Text color='secondary' weight='bold'>Preview Page...</Text>
          </Divider>
      </Modal.Header>
      <Modal.Body>
      <Container css={{'@md':{px:300}}}>
        <Spacer/>
        <Text weight='bold' size={25} color='secondary'>{post.title}</Text>
        <Text>{post.description}</Text>
        <Spacer/>
        <Divider/>
        <Spacer/>
        <Image src={post.imageURL} alt='post image'/>
        <Spacer/>
        <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content).__html}} />
        <Spacer/>
        <Divider/>
      </Container>
      </Modal.Body>
      <Modal.Footer>
        {
            //render loading component when post being uploaded
            updateLoading? (
            <>
              <Button disabled auto bordered color="primary" css={{ px: "$13" }}>
                    <Loading color="currentColor" size="sm" />
                </Button>
            </>):(
            <>
            
              {
                //condition to choose the button function to render 
                post.status==='Draft'&&(<Button bordered shadow size='sm' color='secondary' onPress={()=>updatePost("Draft")} auto>Save Edit</Button>)
              }
              {
                //condition to choose the button function to render 
                post.status==='Published'&&(<Button bordered shadow size='sm' color='secondary' onPress={()=>updatePost("Published")} auto>Update Post</Button>)
              }
            </>)}
            <Spacer/>
            <Button bordered flat size='sm' color='secondary' onPress={handleFunctions.handleBackToEdit} auto>Continue Editing</Button>
      </Modal.Footer>
      <Spacer/>
    </Modal>
  )
}

export default PostPreviewModal