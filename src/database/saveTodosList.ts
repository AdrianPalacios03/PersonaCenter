import { doc, setDoc,  } from "firebase/firestore/lite"
import { personaDB } from "../firebase/config"
import { User } from "firebase/auth";
import { sToast } from "../util/toast";

export const saveTodosList = async (user: User | null, todos: object) => {
    if (user === null)  return new Error('User not found');
    
    const newDoc = doc(  personaDB, `${user.uid}/todos` )
    await setDoc( newDoc, todos ).then(() => {
        sToast("To do's saved correctly");
    });
}