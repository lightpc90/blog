import { Container, Card, Text, Spacer } from "@nextui-org/react"
import Link from "next/link"

const PostListCard = ({post}) => {
    return(<div key={post.content}>
            <Link href={`/Post/${post.id}`}>
              <Card css={{ '@md': {w: "70%", h: "300px"}, '@sm': {w: "90%", h: "200px"} }} variant='bordered' isHoverable isPressable>
                <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>    
                <Text color='secondary' weight='bold' size={18}>
                    {post.title}
                  </Text>
                </Card.Header>
                <Card.Body>
                  <Card.Image 
                    src={`post.postImage.downloadURL`}
                    objectFit="cover"
                    width="100%"
                    height={300}
                  />
                </Card.Body>
                <Card.Footer
                isBlurred
                css={{
                  position: "absolute",
                  bgBlur: "#0f111466",
                  borderTop: "$borderWeights$light solid $gray800",
                  bottom: 0,
                  zIndex: 1,}}>
                    <Text>
                      {post.description}
                    </Text>
                </Card.Footer>  
              </Card>
            </Link>
            <Spacer/>
            
    </div>)
}

export default PostListCard