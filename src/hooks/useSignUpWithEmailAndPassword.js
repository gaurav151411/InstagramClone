import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import { doc, setDoc ,collection,query,where,getDocs} from 'firebase/firestore';
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';
const useSignUpWithEmailAndPassword = () => {
  const [createUserWithEmailAndPassword, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const showToast = useShowToast();

  const loginUser =useAuthStore((state)=>state.login);

  const signup = async (inputs) => {
    if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullname) {
      showToast("Error", "Please fill all the fields", "error");
      return false;
    }


    const usersRef = collection(firestore, "users");

  const q = query(usersRef, where("username", "==", inputs.username));

    const querySnapshot =await getDocs(q);
    if(!querySnapshot.isEmpty){
      showToast("Error","username already exists","error")
    }
    try {
      const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);

      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return 
      }
      
      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          fullname: inputs.fullname,
          username: inputs.username,
          bio: "",
          profilePicURL: "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };

        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));

        loginUser(userDoc);
        
      }
      
     
    } catch (err) {
      showToast("Error", err.message, "error");
      
    }
  };

  return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;
