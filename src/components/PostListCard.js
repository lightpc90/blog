import { Grid, Card, Text } from "@nextui-org/react"
import Link from "next/link"

const PostListCard = ({post}) => {
    return(<>
            <Grid justify='center' xm={12} sm={6} md={4}>
              <Card variant='bordered'>
                <Card.Header>
                <Link href={`/Post/${post.id}`}>
                 <Text color='secondary' weight='bold'>
                    {post.title}
                  </Text>
                </Link>
                </Card.Header>
                <Card.Divider />
                <Card.Body>
                    {post.description}
                </Card.Body>
              </Card>
            </Grid>
    </>)
}

export default PostListCard