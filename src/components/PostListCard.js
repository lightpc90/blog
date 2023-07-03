import getAUser from "@/firebase/user/getAUser"
import { Container, Card, Loading, Text, Grid, Col, Spacer, Divider, Row } from "@nextui-org/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useAuthContext } from "@/context/AuthContext"
import AuthorAvatar from "./AuthorAvatar"


const PostListCard = ({post, index}) => {
    const {user} = useAuthContext()
    const [author, setAuthor] = useState('')
    const [imageLoading, setImageLoading] = useState(true)

    useEffect(()=>{
      const fetchAuthor = async()=>{
          const {result, error} = await getAUser(post.author)
          if (result && result.data().username){setAuthor(result.data().username)}
          else if(result){setAuthor(result.data().email)}
          else{console.log('error fetching the author', error)}
      }
      fetchAuthor()
    }, [])

    const handleImageLoad = ()=>{
      setImageLoading(false)
    }

    return(
      <Container css={{p:0}} key={index}>
            
              <Grid.Container>
              <Link href={`/Post/${post.id}?author=${author}`}>
                <Card css={{mw: '500px'}}  variant='flat' isHoverable isPressable>
                    {imageLoading && <Container  align="center"><Loading type="spinner" color='secondary' /></Container> }
                    <Card.Image 
                      src={`${post.postImage.downloadURL}`}
                      objectFit="cover"
                      onLoad={handleImageLoad}
                    />
                </Card>
                <Row>
                <Text size={20} color="secondary" weight='bold'>{post.title}</Text>
                </Row>
              </Link>
                <Col>
                  <Text size={17}>{post.description}</Text>
                  <AuthorAvatar author={author} post={post}/> 
                </Col>
                <Spacer/>
                <Divider/>
                </Grid.Container>
              
          
            <Spacer/>
            
    </Container>)
}

export default PostListCard