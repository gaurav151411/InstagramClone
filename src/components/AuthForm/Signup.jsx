import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Input, InputGroup, InputRightElement,Button, Alert,AlertIcon,AlertTitle,AlertDescription, } from "@chakra-ui/react"
import { useState } from "react"
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword"
const Signup = () => {
    const [inputs,setInputs]=useState({
        email:'',
        password:'',
        fullname:'',
        username:''
    })
    const[showPassword,setShowPassword]=useState(false);
    const{loading,error,signup}=useSignUpWithEmailAndPassword()

   
  return (
   <>
     <Input 
            placeholder="Email"
            fontSize={14}
            type='email'
            size={'sm'}
            value={inputs.email}
            onChange={(e)=>setInputs({...inputs,email:e.target.value})}
        />
        <Input 
            placeholder="User Name"
            fontSize={14}
            type='text'
            size={'sm'}
            value={inputs.username}
            onChange={(e)=>setInputs({...inputs,username:e.target.value})}
        />
        <Input 
            placeholder="Full Name"
            fontSize={14}
            type='text'
            size={'sm'}
            value={inputs.fullname}
            onChange={(e)=>setInputs({...inputs,fullname:e.target.value})}
        />
       
        <InputGroup>
            <Input 
                placeholder="Password"
                fontSize={14}
                type={showPassword?"text":"password"}
                value={inputs.password}
                size={'sm'}
                onChange={(e)=>setInputs({...inputs,password:e.target.value})}
            />

            <InputRightElement h="full">
                <Button variant={'ghost'} size={'sm'} onClick={()=>setShowPassword(!showPassword)}>
                    {showPassword?<ViewIcon/>:<ViewOffIcon/>}

                </Button>
            </InputRightElement>
        </InputGroup>

        {error &&(
            <Alert status='error'>
            <AlertIcon  fontSize={12}/>
           
           {error.message}
          </Alert>
        )}

        <Button w={"full"} colorScheme="blue" size={"sm"} fontSize={14} 
        
        isLoading={loading}
        onClick={()=>signup(inputs)}>
                    Sign Up
        </Button>
   </>

  )
}

export default Signup