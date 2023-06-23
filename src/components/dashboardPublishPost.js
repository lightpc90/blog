import React from 'react'
import { Text, Link, Spacer, Row, Divider } from '@nextui-org/react'

const DashboardPublishPost = ({publishedPost, index}) => {
  return (
    <div key={index}>
        <Text align='right'>{publishedPost.created}</Text>
        <Link href={`/Post/${publishedPost.id}?author=${publishedPost.author}`}>
            <Row>
                <Text>
                    {index+1}.
                </Text>
                <Spacer x={.3}/>
                <Text color='secondary'>
                    {publishedPost.title}
                </Text>
            </Row>
            
        </Link>
        
        <Spacer y={.5}/>
        <Divider />
    </div>
  )
}

export default DashboardPublishPost