import getAUser from "@/firebase/user/getAUser"
import { Container, Card, Loading, Text, Grid, Col, Spacer, Divider, Row } from "@nextui-org/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useAuthContext } from "@/context/AuthContext"


const PostListCard = ({post}) => {
    const {user} = useAuthContext()
    const [author, setAuthor] = useState('')
    const [imageLoading, setImageLoading] = useState(true)

    useEffect(()=>{
      const fetchAuthor = async()=>{
        if(user && user.id === post.author){
          setAuthor('My Post')
        }
        else{
          const {result, error} = await getAUser(post.author)
          if (result && result.data().username){setAuthor(result.data().username)}
          else if(result){setAuthor(result.data().email)}
          else{console.log('error fetching the author', error)}
        }
      }
      fetchAuthor()
    }, [])

    const handleImageLoad = ()=>{
      setImageLoading(false)
    }

    return(
      <div key={post.content}>
            
              <Grid.Container>
              <Link href={`/Post/${post.id}?author=${author}`}>
                <Card css={{mw: '500px'}}  variant='flat' isHoverable isPressable>
                    {imageLoading && <Container justifyItems="center" align="center"><Loading type="spinner" color='secondary' /></Container> }
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
                  <Row>
                    <Text size={17} b color='secondary'>Author:</Text>
                    <Spacer x={.3}/>
                    <Text b >{author}</Text>
                  </Row>
                  <Row>
                    <Text size={17} b color='secondary'>Published:</Text>
                    <Spacer x={.3}/>
                    <Text b >{post.created}</Text>
                  </Row>
                  <Spacer/>
                  <Divider/>
                </Col>
                
                </Grid.Container>
              
          
            <Spacer/>
            
    </div>)
}

export default PostListCard