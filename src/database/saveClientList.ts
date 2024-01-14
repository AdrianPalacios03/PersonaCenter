import { doc, setDoc,  } from "firebase/firestore/lite"
import { personaDB } from "../firebase/config"
import { User } from "firebase/auth";
import { sToast } from "../util/toast";

export const saveClientsList = async (user: User | null, clients: object) => {
    if (user === null)  return new Error('User not found');
    
    const newDoc = doc(  personaDB, `${user.uid}/clients` )
    await setDoc( newDoc, clients ).then(() => {
        sToast('Clients saved correctly');
    });
}