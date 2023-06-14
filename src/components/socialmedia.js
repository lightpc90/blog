import React from 'react'
import { useAuthContext } from '@/context/AuthContext';
import {RiWhatsappFill} from 'react-icons/ri'
import {SiLinkedin} from 'react-icons/si'
import {FaTwitterSquare} from 'react-icons/fa'
import {FcNext} from 'react-icons/fc'
import {IoCallSharp} from 'react-icons/io'
import { Container, Spacer, Text, Link, Button } from '@nextui-org/react';

const SocialMedia = () => {
    const {user} = useAuthContext()

    const handleWhatsAppClick = () => {
        let message = ''
        if(user){ message = encodeURIComponent(`Hey!, Gideon. I am ${user.username}, I want to ...`)}
        else{message = encodeURIComponent(`Hey!, Gideon. I am [Your Name], I want to ...`)}
        const phoneNumber = "+2348130853142"; 
    
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;
    
        window.open(whatsappLink, "_blank");
      };

  return (
    <div>
    <Container display='flex'>
        <Text color='secondary' weight='bold'><FcNext /></Text>
        <Spacer x={1}/>
        <Button light onPress={handleWhatsAppClick}> <Text size={20} color='success'> Whatsapp <RiWhatsappFill /></Text></Button>
        <Spacer x={.5}/>
        <Link href='#'><Text size={22} color='primary'><SiLinkedin /></Text></Link>
        <Spacer x={.5}/>
        <Link href='#'><Text size={22} color='primary'><FaTwitterSquare /></Text> </Link>
    </Container>
    <Spacer y={2}/>
    </div>
  )
}

export default SocialMedia