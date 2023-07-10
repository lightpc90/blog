import React, {useState, useEffect} from 'react'
import PostDeleteModal from './PostDeleteModal'
import PublishOrPullDown from '@/firebase/updatePost'
import { Text, Container, Link, Spacer, Row, Loading, Divider, Button, Grid } from '@nextui-org/react'
import { useAuthContext } from '@/context/AuthContext'
import CountdownTimer from '@/helperFunctions/Countdown'

const DashboardDraftPost = ({postLoading, draftPost, index, allDrafts, setDrafts, handleUpdateButton}) => {
    const {setUpdateCtxPosts, updateCtxPosts} = useAuthContext()
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [loadingPublish, setLoadingPublish] = useState(false)

    const [showPicker, setShowPicker] = useState(false);
    const [countdown, setCountdown] = useState(false);
    const [loadingSetDate, setLoadingSetDate] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date().getTime())
    const [pastDate, setPastDate] = useState(false)
    const [dateChanged, setDateChanged] = useState(false)

    const [disableDelete, setDisableDelete] = useState(false)
    const [disablePublish, setDisablePublish] = useState(false)
    const [stopScheduleLoading, setStopScheduleLoading] = useState(false)


    //opens the delete modal
    const handlerModal = () => {
        setDeleteModalVisible(true)
    };

    //handle schedule button
    const handleScheduleButton =()=>{
        setShowPicker(!showPicker)
    }

    //handle date change event
    const handlePickerChange=(e)=>{
        setPastDate(false)
        setDateChanged(true)
        setSelectedDate(new Date(e.target.value).getTime())   
    }

    const handleDateOnblur =()=>{
        if (dateChanged && selectedDate < new Date().getTime()){
            setPastDate(true)
            }
    }

    const handleSetDate= async()=>{
        console.log('entering handleSetDate function...')
        setLoadingSetDate(true)
        //function to update the post with schedule time
        if (selectedDate < new Date().getTime()){
            setPastDate(true)
            setLoadingSetDate(false)
            return
        }
        const {error} = await PublishOrPullDown(draftPost.id, {schedule: selectedDate})
        if (error){
            setLoadingSetDate(false)
            console.log('error updating schedule into post db')
            return
        }
        setLoadingSetDate(false)
        setCountdown(true)
        setUpdateCtxPosts(!updateCtxPosts)

        
    }
   
    //loop to constantly check time remaining for a schedule post to go live
    useEffect(()=>{
        const now = new Date().getTime()
        console.log('draftPost publish retrieved: ', draftPost.schedule)
        console.log('current time: ', now)
        if(!!draftPost.schedule && draftPost.schedule > now){
            setSelectedDate(draftPost.schedule)
            setCountdown(true)
        }
    }, [])

    const handleStopSchedule =async()=>{
        setStopScheduleLoading(true)
        const {error} = await PublishOrPullDown(draftPost.id, {schedule: ''})
        if (error){
            setStopScheduleLoading(false)
            console.log('error stopping the schedule')
            return
        }
        setStopScheduleLoading(false)
        setCountdown(false)
        setDisableDelete(false)
        setDisablePublish(false)
        setUpdateCtxPosts(!updateCtxPosts)
    }

   

    //handles the publish button
    const handlePublish = async()=>{
        console.log('beginning of post publish')
        setDisableDelete(true)
        setDisablePublish(true)
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
                <Link onPress={()=>{handleUpdateButton(draftPost.id)}} href={`#`}>
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

            {
            //conditionally render countdown timer for schedule
            countdown && <Row>
               <CountdownTimer scheduledDate={selectedDate} setDisableDelete={setDisableDelete}
                setDisablePublish={setDisablePublish}
                setShowPicker={setShowPicker}
                handleStopSchedule={handleStopSchedule}
                handlePublish={handlePublish} />
            </Row>}

            {
            //conditionally render date and time picker
            showPicker && <Grid.Container  > 
                <Grid md={4}>
                    <input type="datetime-local" onBlur={handleDateOnblur}  onChange={handlePickerChange} />
                </Grid>

                <Spacer y={2}/>

                {
                //render loading when the date is being set
                loadingSetDate?(<>
                <Grid>
                    <Button disabled size='sm' auto bordered color="primary" css={{ px: "$13" }}>
                        <Loading color="currentColor" size="sm" />
                    </Button>
                </Grid>
                </>):(<>
                <Grid>
                    <Button size='sm' onPress={handleSetDate} bordered color='gradient' auto>Set Date</Button>
                </Grid>
                {dateChanged && pastDate && <Text color='error'>Sorry, You cannot time-travel to the past here</Text>}
                
                </>)}
                
            </Grid.Container>
            }
            <Spacer/>
            <Divider/>
            <Spacer/>
            <Grid.Container gap={1}>
                <Grid>
                    {countdown?(
                    <> 
                        {stopScheduleLoading?(<>
                            <Button disabled size='sm' auto bordered color="primary" css={{ px: "$13" }}>
                                <Loading color="currentColor" size="sm" />
                            </Button>
                        </>):(<>
                            <Button onPress={handleStopSchedule} size='sm' bordered color='gradient' auto>Stop Schedule</Button>
                        </>)}
                        
                    </>):(
                    <>
                        <Button onPress={handleScheduleButton} size='sm' bordered color='gradient' auto>Schedule</Button>
                    </>)}
                    
                </Grid>
                <Grid>
                    {loadingPublish?(
                    <Button disabled size='sm' auto bordered color="primary" css={{ px: "$13" }}>
                        <Loading color="currentColor" size="sm" />
                    </Button>):(<Button disabled={disablePublish} size='sm' onPress={handlePublish}  bordered color='secondary' auto>Publish</Button>)}
                    
                </Grid>
                <Grid>
                    <Button disabled={disableDelete} size='sm'  onPress={handlerModal} color='error' auto>Delete</Button>
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