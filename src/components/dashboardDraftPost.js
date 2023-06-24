import React from 'react'
import { Text, Link, Spacer, Row, Divider, Button, Grid } from '@nextui-org/react'

const DashboardDraftPost = ({postLoading, draftPost, index}) => {
    return (
        <div key={index}>

            {!postLoading?(
            <>
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
            <Grid.Container gap={1}>
                <Grid>
                    <Button bordered color='gradient' auto>Edit</Button>
                </Grid>
                <Grid>
                    <Button bordered color='secondary' auto>Publish</Button>
                </Grid>
                <Grid>
                    <Button color='error' auto>Delete</Button>
                </Grid>
            </Grid.Container>
            
            <Spacer y={.5}/>
            <Divider />
            </>
            ):(<>

            {/**loading component here */}
            <Row css={{height: '100%', top: '$15'}} justify='center'><Loading type='points' color="secondary"/></Row>
            </>)}
            
        </div>
      )
    }

export default DashboardDraftPost