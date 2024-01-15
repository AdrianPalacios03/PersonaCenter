import { doc, getDoc, setDoc } from "firebase/firestore/lite";
import { personaDB } from '../firebase/config';
import { User } from "firebase/auth";
// import {  } from "firebase/firestore";
import { sToast } from "../util/toast";
import { getCurrentMonth } from "../util/getCurrentMonth";

export const getDBMonth = async (user: User): Promise<string> => {
    const collectionRef = doc( personaDB, `${user.uid}/currentMonth` ) 
    const data = await getDoc(collectionRef);
    if (data.data()) {
        return data.data()!.month;
    } else {
        setDBMonth(user, getCurrentMonth().monthName);
        return getCurrentMonth().monthName;
    }
}

export const setDBMonth = async (user: User, month: string) => {
    const ref = doc( personaDB, `${user.uid}/currentMonth` ) 
    await setDoc(ref, { month }).then(() => {
        sToast('Happy new month!');
    })
}