import { doc, getDoc } from "firebase/firestore/lite";
import { personaDB } from '../firebase/config';
import { User } from "firebase/auth";

export const getClients = async (user: User | null) => {
    if (user === null)  return;
    const collectionRef = doc( personaDB, `${user.uid}/clients` ) 
    const data = await getDoc(collectionRef);
    if (data.data())
        return data.data()!.clients 
    else
        return [];
}