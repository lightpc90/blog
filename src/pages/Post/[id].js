import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Comments from '@/components/Comments'
import {Grid, Text, Card} from '@nextui-org/react'
import getAPost from '@/firebase/getAPost'

const PostPage = () => {
  const [post, setPost] = useState({})
  const router = useRouter()
  const {id} = router.query

  useEffect(()=>{
    const fetchPost =async ()=>{
      const {result, error} = await getAPost(id)
      if(!!result){
        setPost(result.data())
      }
    }

    if (id){fetchPost()}
   
  }, [id])

  if (!post){
    return(<div>Loading...</div>)
  }


  return (
    <>
      <div>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
        <Comments />
    </>
  )
}

export default PostPage