import React, {useContext} from 'react'
import { Navbar, Button, Container, Text, Link, Spacer } from '@nextui-org/react'
import { AuthContext } from '@/context/AuthContext'
import Logout from '@/firebase/auth/Logout'
import {FaGreaterThan, FaLessThan} from 'react-icons/fa'
import {SiSlashdot} from 'react-icons/si'


const Navigationbar = () => {
  
  const {user} = useContext(AuthContext)

  const handleLogout=async()=>{
    const {result, error} = await Logout()
    if(!!result){console.log("result: ", result)}
    else{console.log("error: ", error)}  
  }



  return (
    <div>

      <Navbar isBordered variant="sticky">
        {user?(<>
        {/** When user logged in */}
          <Navbar.Brand>
         {/**Logo comes here */}
         <Navbar.Toggle aria-label='toggle navigation' />
         <Spacer />
         <Text b size={15} color='inherit'>
          <FaLessThan/>24CODELABz<SiSlashdot/><FaGreaterThan/>
         </Text>
        </Navbar.Brand>
        <Navbar.Content enableCursorHighlight hideIn='xs' variant='underline'>
          <Navbar.Link isActive href='/'>Blog Posts</Navbar.Link>
          <Navbar.Link href='/Admin/NewPost'>Create Post</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Item>
            <Button auto flat onPress={handleLogout}>Logout</Button>
          </Navbar.Item>
        </Navbar.Content>
        <Navbar.Collapse>
          <Navbar.CollapseItem>
              <Link color='inherit' 
                css={{minWidth: '100%',}}
                href={`/${user.username}/Dashboard`}>
                  My Dashboard
              </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem>
              <Link color='inherit' 
                css={{minWidth: '100%',}}
                href={`/`}>
                  All Posts
              </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem>
              <Link color='inherit' 
                css={{minWidth: '100%',}}
                href={`/Admin/NewPost`}>
                  Create Post
              </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem>
              <Link color='inherit' 
                css={{minWidth: '100%',}}
                href={`/ReportBug`}>
                  Report Bug
              </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem>
              <Link color='inherit' 
                css={{minWidth: '100%',}}
                href={`/About`}>
                  About
              </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem>
              <Button flat color='inherit' 
                css={{minWidth: '100%',}}
                onPress={handleLogout}>
                  Logout
              </Button>
            </Navbar.CollapseItem>
        </Navbar.Collapse>
        </>):(<>


        {/** When logged out */}
        <Navbar.Brand>
         {/**Logo comes here */}
         <Navbar.Toggle aria-label='toggle navigation' />
         <Spacer />
         <Text b color='inherit'>
          24CODELABz
         </Text>
        </Navbar.Brand>
        <Navbar.Content enableCursorHighlight hideIn='xs' variant='underline'>
          <Navbar.Link isActive href='/'>Blog Posts</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Item>
            <Button auto flat bordered color='secondary' as={Link} href='/Login'>Login</Button>
          </Navbar.Item>
          <Navbar.Item>
            <Link color='secondary' href='/Register'>Register</Link>
          </Navbar.Item>
        </Navbar.Content>
        <Navbar.Collapse>
            <Navbar.CollapseItem>
              <Link color='inherit' 
                css={{minWidth: '100%',}}
                href={`/`}>
                  All Posts
              </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem>
              <Link color='inherit' 
                css={{minWidth: '100%',}}
                href={`#`}>
                  Report Bug
              </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem>
              <Link color='inherit'
                css={{minWidth: '100%',}}
                href={`#`}>
                  About
              </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem>
              <Link bordered color='secondary' href='/Login'>
                  Login
              </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem>
              <Link bordered color='secondary' href='/Register'>
                  Register
              </Link>
            </Navbar.CollapseItem>
        </Navbar.Collapse>
        </>)}
        
      </Navbar>
    </div>
  )
}

export default Navigationbar