import {Container, Text, Spacer, Divider, Grid, Link} from '@nextui-org/react'
import SocialMedia from './socialmedia';


const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <>
    
    <Spacer y={5}/>
    <SocialMedia />
    <Container><Divider /></Container>
     <Spacer />
    <Container display='flex' justify='center' css={{ bottom: 0, width: '100%' }}>
       <Grid >
            <Text align='center'>&copy; {currentYear} </Text>
        </Grid>
        <Spacer x={.3}/>
       <Grid> 
            <Text color='secondary' weight='bold'>24CODELABz</Text>
        </Grid>
        <Spacer x={.3}/>
        <Grid>
            <Text>by Gideon Abbey. All Rights Reserved</Text>
        </Grid>
        <Spacer y={2}/>
    </Container>    
    </>
    
  )
}

export default Footer