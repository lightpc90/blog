import React, {useEffect, useState} from 'react'
import { Text, Link, Container, Spacer, Row, Divider, Button, Loading, Grid} from '@nextui-org/react'
import PostDeleteModal from './PostDeleteModal'
import getAUser from '@/firebase/user/getAUser'
import PublishOrPullDown from '@/firebase/updatePost'
import { useAuthContext } from '@/context/AuthContext'

const DashboardPublishPost = ({user, postLoading, publishedPost, index, ctxPosts, allPublished, setPublished, handleUpdateButton}) => {
    const [author, setAuthor] = useState('')
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [loadingPullDown, setLoadingPullDown] = useState(false)
    const {updateCtxPosts, setUpdateCtxPosts} = useAuthContext()
    
    //to open the delete modal
    const handlerModal = () => {
        setDeleteModalVisible(true)
    };

    const handlePullDown = async()=>{
        console.log('beginning of post publish')
        setLoadingPullDown(true)
        const currentDate = new Date();
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            weekday: 'short',
            day: 'numeric',
            month: 'long',
        };
        const formattedDate = currentDate.toLocaleString('en-US', options);
        const pullDown = formattedDate
        const id = publishedPost.id
        console.log('draftpost id: ', publishedPost.id)
        const updateData = {status: 'Draft', pullDown: pullDown}
        const {result, error}= await PublishOrPullDown(id, updateData)
        if(error){console.log('error from publishing draft: ', error)}
        else{
            setUpdateCtxPosts(!updateCtxPosts)
            console.log('Published Post successfully pulled down...')
        }
        setLoadingPullDown(false)
    }


    //function to fetch post author
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
        if(ctxPosts.length>0){
            fetchAuthor()
        } 
      },[ctxPosts])

  return (
    <Container css={{p:0}} key={index}>
        
        <PostDeleteModal deleteModalVisible={deleteModalVisible} setDeleteModalVisible={setDeleteModalVisible} deletePost={publishedPost} allPosts={allPublished} setPosts={setPublished} />

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
                <Button size='sm' onPress={()=>{handleUpdateButton(publishedPost.id)}}  bordered color='gradient' auto>Update</Button>
            </Grid>
            <Grid>
                {loadingPullDown?(
                <Button disabled size='sm' auto bordered color="primary" css={{ px: "$13" }}>
                    <Loading color="currentColor" size="sm" />
                </Button>
                ):(
                <Button size='sm' onPress={handlePullDown}  bordered color='secondary' auto>Pull Down</Button>
                )}
                
            </Grid>
            <Grid>
                <Button size='sm'  onPress={handlerModal} color='error' auto>Delete</Button>
            </Grid>
        </Grid.Container>
        
        <Spacer y={.5}/>
        <Divider />
        </>
        ):(<>
        {/** component to load when loading posts */}
        <Row css={{height: '100%', top: '$15'}} justify='center'><Loading type='points' color="secondary"/></Row>
        </>)}
        
    </Container>
  )
}

export default DashboardPublishPost