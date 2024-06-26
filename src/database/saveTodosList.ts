import { doc, setDoc,  } from "firebase/firestore/lite"
import { personaDB } from "../firebase/config"
import { User } from "firebase/auth";
import { sToast } from "../util/toast";
import { animateBtn } from "../util/animateBtn";

export const saveTodosList = async (user: User | null, todos: object, showToast: boolean = true) => {
    if (user === null)  return new Error('User not found');
    
    const newDoc = doc(  personaDB, `${user.uid}/todos` )
    await setDoc( newDoc, todos ).then(() => {
        if (showToast)
            sToast("To do's saved correctly");
        animateBtn();
    });
}