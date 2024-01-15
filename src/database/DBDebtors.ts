import { getDoc, doc, setDoc } from "firebase/firestore/lite";
import { personaDB } from "../firebase/config";
import { User } from "firebase/auth";

export const getDebtors = async (user: User) => {
    const ref = doc(personaDB, `${user.uid}/debtors`);
    const data = await getDoc(ref);
    if (data.data()) {
        return data.data()!.debtors;
    }
    else {
        return [];
    }
}

export const setDebtors = async (user: User, debtors: string[]) => {
    const ref = doc(personaDB, `${user.uid}/debtors`);
    await setDoc(ref, { debtors })
}