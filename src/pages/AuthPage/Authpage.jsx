import { Container,Flex } from '@chakra-ui/react'
import { Box,Image,VStack } from '@chakra-ui/react'
import AuthForm from '../../components/AuthForm/AuthForm'
const Authpage = () => {
  return (
   <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
    <Container maxW={"container.md"} padding={0} >
      {/* left jand side */}
      <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
        <Box display={{base:"none",md:"block"}}>
          {/* base:none means in the smaller screens we can't see the image */}
            <Image src="/auth.png" h={650} alt="Phone img" /> 
        </Box>
      
     
      {/* right hand side */}
      <VStack spacing={4} align={"stretch"}>
        <AuthForm/>
        <Box textAlign={"center"}> Get the app </Box >
        <Flex gap={5} justifyContent={"center"}>
            <Image src="/playstore.png" h={"10"} alt='Playstore logo'/>
            <Image src="/microsoft.png" h={"10"} alt='Microsoft logo'/>
        </Flex>
      </VStack>
      </Flex>
    </Container>
   </Flex>
   
  )
}

export default Authpage