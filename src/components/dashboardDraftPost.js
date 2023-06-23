import React from 'react'
import { Text, Link, Spacer, Row, Divider, Button } from '@nextui-org/react'

const DashboardDraftPost = ({draftPost, index}) => {
    return (
        <div key={index}>
            <Text align='right'>{draftPost.created}</Text>
            <Link href={`/Draft/${draftPost.title}?author=${draftPost.author}`}>
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
            <Row>
            <Button bordered color='secondary' auto>Edit</Button>
            <Spacer x={.3}/>
            <Button color='secondary' auto>Publish</Button>
            </Row>
            
            <Divider />
        </div>
      )
    }

export default DashboardDraftPost