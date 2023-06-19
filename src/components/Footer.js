import {Container, Text, Spacer, Divider, Grid, Link} from '@nextui-org/react'
import SocialMedia from './socialmedia';
import {FaGreaterThan, FaLessThan} from 'react-icons/fa'
import {SiSlashdot} from 'react-icons/si'


const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <>
    <Spacer y={5}/>
    <Container>
    <SocialMedia />
    </Container>
    
    <Container><Divider /></Container>
     <Spacer />
    <Container display='flex' justify='center' css={{ bottom: 0, width: '100%' }}>
       <Grid >
            <Text align='center'>&copy; {currentYear} </Text>
        </Grid>
        <Spacer x={.3}/>
       <Grid> 
            <Text color='secondary' weight='bold'><FaLessThan />24CODELABz<SiSlashdot/><FaGreaterThan/> Blog</Text>
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