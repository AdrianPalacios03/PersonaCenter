import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../firebase/config";

const authUser = async (email: string, password: string) => {
    try {
        const user = (await signInWithEmailAndPassword(firebaseAuth, email, password)).user;
        return user;
    } catch (error) {
        return false;
    }
} 


export default authUser;