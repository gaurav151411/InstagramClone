import { doc, getDoc } from 'firebase/firestore';
import  { useEffect, useState } from 'react'
import { firestore } from '../firebase/firebase';
import useShowToast from './useShowToast';

const useGetUserProfileById = (userId) => {
  const[isLoading,setIsloading]= useState(true);
  const[userProfile,setUserProfile] =useState(null);
  const showToast=useShowToast();
  useEffect(()=>{
    const getUserProfile=async()=>{
        setIsloading(true);
        setUserProfile(null);
        try{
            const useRef=await getDoc(doc(firestore,"users",userId))
            if(useRef.exists()){
                setUserProfile(useRef.data())
            }
        }catch(error){

        }finally{
            setIsloading(false);
        }
    }
    getUserProfile();
  },[showToast,setUserProfile,userId])

  return {isLoading,userProfile,setUserProfile}
}

export default useGetUserProfileById