import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Text, Row, Button, Textarea, Spacer, Link } from '@nextui-org/react'
import addComment from '@/firebase/addComment'
import { AuthContext } from '@/context/AuthContext'
import CommentLogin from './commentLogin'

const NewComment = ({postId}) => {
  const {user} = useContext(AuthContext)
  const [comment, setComment] = useState('')
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
    if(!isUser){
    router.push('/register?q=comment')
    }
    if(!!comment){
        let commentObject = {content: comment, commenter: user.uid, postId:postId}
        const {result, error} = await addComment(commentObject)
        if(!!error){console.log('error posting a comment: ', error)}
    }
    else{setIsEmptyComment(true)}
      
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
        <Row align='center'>
        <Button onPress={handlePostComment} 
            color='secondary' auto ghost>
            Post Comment
        </Button>
        {!isUser?(<>
            <Button onPress={handleLoginToggle} light color="secondary" auto >
                Login
            </Button>
            <Text >| Not a registered user? </Text>
            <Spacer x={.5} />
            <Link href={`/register?q=${{"from":'comment', "postId": postId}}`} color="secondary">
                Register
            </Link>
        </>
        ):(<></>)} 
        </Row>
        {loginInputVisible?(<><CommentLogin /></>):(<></>)}
           
    </div>
  )
}

export default NewComment