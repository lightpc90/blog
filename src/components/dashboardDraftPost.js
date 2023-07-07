import React, {useState, useEffect} from 'react'
import PostDeleteModal from './PostDeleteModal'
import PublishOrPullDown from '@/firebase/updatePost'
import { Text, Container, Link, Spacer, Row, Loading, Divider, Button, Grid } from '@nextui-org/react'
import { useAuthContext } from '@/context/AuthContext'

const DashboardDraftPost = ({postLoading, draftPost, index, allDrafts, setDrafts}) => {
    const {setUpdateCtxPosts, updateCtxPosts} = useAuthContext()
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [loadingPublish, setLoadingPublish] = useState(false)

    //opens the delete modal
    const handlerModal = () => {
        setDeleteModalVisible(true)
    };

    //handles the publish button
    const handlePublish = async()=>{
        console.log('beginning of post publish')
        setLoadingPublish(true)
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
        const published = formattedDate
        const id = draftPost.id
        console.log('draftpost id: ', draftPost.id)
        const updateData = {status: 'Published', published: published}
        const {result, error}= await PublishOrPullDown(id, updateData)
        if(error){console.log('error from publishing draft: ', error)}
        else{
            setUpdateCtxPosts(!updateCtxPosts)
            console.log('Draft successfully published...')
        }
        setLoadingPublish(false)
    }

    return (
        <Container css={{p:0}} key={index}>

            <PostDeleteModal deleteModalVisible={deleteModalVisible} setDeleteModalVisible={setDeleteModalVisible} deletePost={draftPost} allPosts={allDrafts} setPosts={setDrafts} />

            {!postLoading?(
            <>
                <Text align='right'>{draftPost.created}</Text>
            <Link href={`#`}>
                <Row>
                    <Text>
                        {index+1}.
                    </Text>
                    <Spacer x={.3}/>
                    <Text color='secondary'>
                        {draftPost.title}
                    </Text>
                </Row>
            </Link>
            <Spacer y={.5}/>
            <Grid.Container gap={1}>
                <Grid>
                    <Button size='sm' bordered color='gradient' auto>Schedule</Button>
                </Grid>
                <Grid>
                    {loadingPublish?(
                    <Button disabled size='sm' auto bordered color="primary" css={{ px: "$13" }}>
                        <Loading color="currentColor" size="sm" />
                    </Button>):(<Button size='sm' onPress={handlePublish}  bordered color='secondary' auto>Publish</Button>)}
                    
                </Grid>
                <Grid>
                    <Button size='sm'  onPress={handlerModal} color='error' auto>Delete</Button>
                </Grid>
            </Grid.Container>
            
            <Spacer y={.5}/>
            <Divider />
            </>
            ):(<>

            {/**loading component here */}
            <Row css={{height: '100%', top: '$15'}} justify='center'><Loading type='points' color="secondary"/></Row>
            </>)}
            
        </Container>
      )
    }

export default DashboardDraftPost