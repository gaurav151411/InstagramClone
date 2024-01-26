import {Flex, Box,Spinner} from '@chakra-ui/react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useLocation } from 'react-router-dom'
import { auth } from '../../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Navbar from '../../components/Navbar/Navbar';
const PageLayout = ({ children }) => {
    const {pathname}=useLocation();

    const [user,loading,error]=useAuthState(auth)
    const canRenderSidebar=pathname!=="/auth" && user;

    const canRenderNavbar=!user && !loading && pathname!=='/auth';

    const checkingUserIsAuthenticated=!user&&loading;
    
    if(checkingUserIsAuthenticated) return <PageLayoutSpinner/>
  return (
    <Flex flexDir={canRenderNavbar?"column":"row"}>
    {/*sidebar on the left  */}
    {canRenderSidebar?(
       <Box w={{base:"70px", md:"240px"}}>
         <Sidebar/>
       </Box> 
    ):null}
   {/* Navbar */}
   {canRenderNavbar?<Navbar/>:null}
    {/* the page content on  the right */}
    <Box flex={1} mx={"auto"} w={{base:"calc(100%-70px)",md:"calc(100%-240px)"}}>
        {children}
    </Box>
    </Flex>
  )
}

export default PageLayout

const PageLayoutSpinner=()=>{
  <Flex flexDir='column' h='100vh' alignItems='center' justifyContent='center'>
			<Spinner size='xl' />
		</Flex>
}