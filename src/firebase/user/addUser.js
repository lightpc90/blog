import {firebase_db} from "./config";
import { collection, addDoc } from "firebase/firestore";

const db = firebase_db

export default async function AddUser(user) {
    const currentDate = new Date();
    const currentTimeString = currentDate.toLocaleTimeString();
    user.created = currentTimeString
    let result = null;
    let error = null;
    try {
        result = await addDoc(collection(db, 'users', user.id), user, 
        { merge: true, }
        );
    } catch (e) {
        error = e;
    }

    return { result, error };
}