import React, {useEffect, useState} from "react";
import { Modal, Button, Text, Input, Row, Spacer, Col, Loading } from "@nextui-org/react";
import DeleteAPost from "@/firebase/deleteAPost";

const PostDeleteModal = ({deleteModalVisible, setDeleteModalVisible, deletePost, allPosts, setPosts}) => {
    const [confirmationText, setConfirmationText] = useState('')
    const [disableDelete, setDisableDelete] = useState(true)
    const [Loadingdelete, setLoadingDelete] = useState(false)

    const handleConfirmation=(e)=>{
        setConfirmationText(e.target.value)
    }

    const updatePosts=()=>{
        const updatedPosts = allPosts.filter((post)=>{return(post.id !== deletePost.id)})
        setPosts(updatedPosts)
    }

    useEffect(()=>{
        if(confirmationText==='delete'){
            setDisableDelete(false)
        }
        else{setDisableDelete(true)}
    }, [confirmationText])
    
    //to close delete modal
    const closeHandler = () => {
        setDeleteModalVisible(false);
        console.log("closed");
    };
  
    const handleDelete =async()=>{
      setLoadingDelete(true)
      console.log('entering handleDelete function')
        if(confirmationText==='delete'){
           const {error} = await DeleteAPost(deletePost.id)
           if(error){console.log('error deleting post')}
           else{
            updatePosts()
            setLoadingDelete(false)
            closeHandler()
           }
        }
    }

  return (  
    <div>

      <Modal
        css={{p:"0"}}
        closeButton
        aria-labelledby="Delete-confirmation"
        open={deleteModalVisible}
        onClose={closeHandler}
      >
        <Modal.Header>
            <Col>
            <Row id="confirm-delete-post">
                <Text >
                    Type 
                </Text> 
                <Spacer x={.3}/>
                <Text color="error">
                    delete
                </Text>
                <Spacer x={.3}/>
                <Text>
                in the box below to delete
                </Text>
                <Spacer x={.3}/>
            </Row>
            <Text color='error' align='left'>{deletePost.title}</Text>
            </Col> 
        </Modal.Header>
        <Modal.Body>
          <Input
            bordered
            fullWidth
            aria-label="delete-confirmation-message"
            color="secondary"
            placeholder="type 'delete' here to delete the post"
            onChange={handleConfirmation}
            value={confirmationText}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" auto color="secondary" onPress={closeHandler}>
            Cancel
          </Button>
          {Loadingdelete?(<>
            <Button disabled auto bordered color="primary" css={{ px: "$13" }}>
                <Loading color="currentColor" size="sm" />
            </Button>
          </>):(<>
            <Button size="sm" disabled={disableDelete} bordered color='secondary' auto onPress={handleDelete}>
              Delete
            </Button>
          </>)}
          
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PostDeleteModal
