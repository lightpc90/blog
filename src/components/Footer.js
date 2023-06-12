import {Container, Text, Spacer, Divider, Grid} from '@nextui-org/react'

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <Container display='flex' justify='center' css={{ bottom: 0, width: '100%' }}>
        <Spacer y={8}/>
        <Divider />
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
  )
}

export default Footer