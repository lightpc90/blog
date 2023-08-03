import React, {useEffect, useState, useRef} from 'react'
import AvatarEditor from 'react-avatar-editor';
import { Spacer, Input, Container, Text, Avatar, Row, Col, Modal, Button } from '@nextui-org/react'

const ChangeDpAvatar = ({username}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [editor, setEditor] = useState(null);
  const inputRef = useRef(null)
  const [dpModalVisible, setDpModalVisible] = useState(false)
  const [dpChanged, setDpChanged] = useState(false)
  const [imageSelectedChange, setImageSelectedChange] = useState(false)

  useEffect(()=>{
    console.log('in effect to get dpURL')
    const dpUrl = localStorage.getItem(`${username}-dp`)
    if(dpUrl){
        console.log('there is a dp in storage')
        setPreviewImage(dpUrl)}
    else{
        console.log('there is no dp in storage')
        setPreviewImage('/images/avatar_dp.jpg')}
  },[dpChanged])

  //function to handle avatar click
  const handleAvatarClick =()=>{
    console.log('handleAvatarClick being clicked on...')
    inputRef.current.click()
  }

  //image onChange handle function
  const handleImageSelect = (event) => {
    console.log('now in handleImageSelect function')
    setSelectedImage(event.target.files[0]);
    setImageSelectedChange(!imageSelectedChange)
  };

  //runs this whenever user changes dp
  useEffect(()=>{
    console.log('now in useEffect...')
    const imagePreview=()=>{
        console.log('now in useEffect to set Preview image')
        setPreviewImage(URL.createObjectURL(selectedImage))
        setDpModalVisible(true)
    }
    if(selectedImage){imagePreview()}
  }, [imageSelectedChange])

  //save display picture with set canvas properties
  const handleSaveImage = () => {
    console.log('inside handleSaveImage function')
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      const newDisplayPicture = canvas.toDataURL('image/jpeg', 1.0);
      
      console.log('there is editior...')
      // TODO: Save the newAvatar as the user's profile picture.
      // You can send it to your backend or store it locally as per your application's requirements.
      localStorage.setItem(`${username}-dp`, newDisplayPicture);
      setDpChanged(!dpChanged)
      setDpModalVisible(false)
    }
  };

  const handleCloseDpModal = ()=>{
    console.log('indide close dp modal function...')
    setDpChanged(!dpChanged)
    setDpModalVisible(false)
  }

  return (
    <>
        <Container display='flex' justify='center'>
            <Avatar size="xl" color='secondary' 
              bordered
              src={`${previewImage}`}
              alt='user dp'
              onClick={handleAvatarClick} />

            {/** hidden input to be clicked on via avatar */}
            <Input
              type='file'
              accept='image/*'
              style={{display: 'none'}}
              ref={inputRef}
              onChange={handleImageSelect}
            />

            {
            //load this modal when previewImage is set
            previewImage && (
              <Modal
                css={{p:0}}
                aria-labelledby="Display picture save modal"
                open={dpModalVisible}
                onClose={handleCloseDpModal}
                >
                <Modal.Body>
                  <AvatarEditor
                    ref={(editor) => setEditor(editor)}
                    image={previewImage}
                    width={250}
                    height={250}
                    border={50}
                    color={[255, 255, 255, 0.6]}
                    scale={1.2}
                    rotate={0}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button size='sm' color='secondary' onClick={handleSaveImage} auto>Upload</Button>
                  <Button size='sm' color='error' bordered onClick={handleCloseDpModal} auto>Cancel</Button>
                </Modal.Footer>
              </Modal>  
              )}
        </Container>
    </>
  )
}

export default ChangeDpAvatar