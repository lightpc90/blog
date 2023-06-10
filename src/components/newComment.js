import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Text, Row, Button, Textarea, Spacer, Link } from '@nextui-org/react'
import addComment from '@/firebase/addComment'
import { AuthContext } from '@/context/AuthContext'
import CommentLogin from './commentLogin'

const NewComment = ({postId}) => {
  const {user, setUser} = useContext(AuthContext)
  const [comment, setComment] = useState('')
  const router = useRouter()
  const [isUser, setisUser] = useState(!!user)
  const [loginInputVisible, setLoginInputVisible] = useState(false)

  const handleComment=(e)=>{
    setComment(e.target.value)
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
    if(!isUser){
    router.push('/register?q=comment')
    }
    let commentObject = {content: comment, commenter: user.id, postId:postId}
    const {result, error} = await addComment(commentObject)
    if(!!error){console.log('error posting a comment: ', error)}  
  }

  

  return (
    <div>
        <Spacer />
        <Textarea css={{width: '50%'}} bordered
            color="secondary"
            labelPlaceholder="Comment" 
            value={comment} 
            onChange={handleComment}/>
        <Spacer />
        <Row align='center'>
        <Button onPress={handlePostComment} 
            color='secondary' auto ghost>
            Post Comment
        </Button>
        {!isUser?(<Button onPress={handleLoginToggle} light color="secondary" auto >
          Login
        </Button>):(<></>)}
        <Text >| Not a registered user? </Text>
        <Spacer x={.5} />
        {!isUser?(<Link href={`/register?q=${{"from":'comment', "postId": postId}}`} color="secondary">
          Register
        </Link>):(<></>)} 
        </Row>
        {loginInputVisible?(<><CommentLogin /></>):(<></>)}
           
    </div>
  )
}

export default NewComment