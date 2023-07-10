import React, {useState} from 'react'
import { Container, Tooltip, Grid, Collapse, Text, Divider, Button, Link, Spacer, Row, useSSR } from '@nextui-org/react'
import { AnchorIcon } from './AnchorIcon';

const Collections = () => {
    
  return (
    <Container display='inline' css={{p:0}}>  
        <Spacer/>
        <Container align='center'>
            <Tooltip content={"The smart-contract development in progress. check back"} rounded color='secondary'>
                <Button color='secondary'>Connect Wallet</Button>
            </Tooltip>
        </Container>
        
        <Spacer/>
            <Text align='center' size={20} weight='bold' color='secondary'> My Collections</Text>
        <Spacer y={0.5}/>
        <Container css={{px:'$18'}}><Divider/></Container>
        <Spacer y={0.5}/>
        <Row >
        <Grid.Container css={{minWidth: 'inherit'}} justify='center'>
        <Grid css={{minWidth: 'inherit'}}>
            <Collapse.Group shadow 
            bordered
            >
                <Collapse title="Claimable" arrowIcon={<AnchorIcon />}>

                    <Text weight='bold'>NFTs</Text>
                    <Text>No NFT to claim </Text>
                    <Spacer y={0.5}/>
                    <Divider/>
                    <Spacer y={0.5}/>
                    

                    <Text weight='bold'>Token</Text>
                    <Text>No Token to claim</Text>
                    <Spacer y={0.5}/>
                    <Divider/>
                    <Spacer y={0.5}/>

                </Collapse>
                <Collapse title="NFTs" arrowIcon={<AnchorIcon />}>
                    <Text>
                    You have not claimed any NFT
                    </Text>
                </Collapse>
                <Collapse title="Token" arrowIcon={<AnchorIcon />}>
                    <Text>
                    You have no Token yet
                    </Text>
                </Collapse>
            </Collapse.Group>
        </Grid>
        </Grid.Container>
        </Row>
    </Container>
  );
}
export default Collections