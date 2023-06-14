import { firebase_db } from "../config";
import { doc, setDoc } from "firebase/firestore";

const db = firebase_db

export default async function AddUser(user) {
    const currentDate = new Date();
    const currentTimeString = currentDate.toLocaleTimeString();
    const userDetails = {
        id: user.uid,
        email: user.email,
        username: user.username,
        created: currentTimeString, 
        role: "user"  
    }
    let result = null;
    let error = null;
    try {
        result = await setDoc(doc(db, 'users', userDetails.id), userDetails, 
        );
    } catch (e) {
        error = e;
    }

    return { result, error };
}