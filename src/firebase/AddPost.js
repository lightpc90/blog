import {firebase_db} from "./config";
import { collection, addDoc } from "firebase/firestore";

const db = firebase_db

export default async function AddPost(data) {
    let result = null;
    let error = null;

    try {
        result = await addDoc(collection(db, 'Posts'), data, 
        { merge: true, }
        );
    } catch (e) {
        error = e;
    }

    return { result, error };
}