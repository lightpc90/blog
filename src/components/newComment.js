import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Text, Row, Loading, Button, Grid, Textarea, Spacer, Link } from '@nextui-org/react'
import addComment from '@/firebase/addComment'
import { AuthContext } from '@/context/AuthContext'
import CommentLogin from './commentLogin'

const NewComment = ({postId, setComments}) => {
  const {user} = useContext(AuthContext)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [isUser, setisUser] = useState(!!user)
  const [loginInputVisible, setLoginInputVisible] = useState(false)
  const [isEmptyComment, setIsEmptyComment] = useState(false)

  const handleComment=(e)=>{
    setComment(e.target.value)
    setIsEmptyComment(false)
  }
  const handleLoginToggle = ()=>{
    setLoginInputVisible(!loginInputVisible)
  }

  useEffect(()=>{
    const checkUser = ()=>{
     if(!!user){setisUser(true)}
     else{setisUser(false)}
    }
    checkUser()  
  },[user])

  const handlePostComment = async()=>{
    setLoading(true)
    if(!isUser){
    router.push('/register?q=comment')
    }
    if(!!comment){
        let commentObject = {content: comment, commenter: user.username, postId:postId}
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
        commentObject.created = formattedDate
        const {result, error} = await addComment(commentObject)
        if(result){
          setComments(result.data().comments)
        }
        if(error){
          console.log('error creating comment', error)
        }
    }
    else{setIsEmptyComment(true)}
    setLoading(false)
      
  }

  

  return (
    <div>
        <Spacer />
        <Textarea css={{width: '50%'}} bordered
            color="secondary"
            labelPlaceholder="Comment" 
            value={comment} 
            onChange={handleComment}/>
        {isEmptyComment?(<Text color='error'>You cannot post an empty comment</Text>):(<></>)}
        <Spacer />
        <Grid.Container alignItems='center'>
          {loading?(
            <Button disabled auto bordered color="primary" css={{ px: "$13" }}>
                      <Loading color="currentColor" size="sm" />
            </Button>):(
            <Button onPress={handlePostComment} 
              color='secondary' auto ghost>
              Post Comment
            </Button>
        )}
        
        {!isUser?(<>
            <Grid>
              <Button onPress={handleLoginToggle} light color="secondary" auto >
                  Login
              </Button>
            </Grid>
            <Text >| Not a registered user? </Text>
            <Spacer x={.5} />
            <Link href={`/register?q=${{"from":'comment', "postId": postId}}`} color="secondary">
                Register
            </Link>
        </>
        ):(<></>)} 
        </Grid.Container>
        {loginInputVisible?(<><CommentLogin /></>):(<></>)}
           
    </div>
  )
}

export default NewComment