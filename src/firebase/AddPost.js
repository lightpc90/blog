import {firebase_db} from "./config";
import { collection, addDoc } from "firebase/firestore";

const db = firebase_db

export default async function AddPost(Post) {
    Post.author = 'Admin'
    const currentDate = new Date();
    const currentTimeString = currentDate.toLocaleTimeString();
    Post.created = currentTimeString
    let result = null;
    let error = null;
    try {
        result = await addDoc(collection(db, 'posts'), Post, 
        { merge: true, }
        );
    } catch (e) {
        error = e;
    }

    return { result, error };
}