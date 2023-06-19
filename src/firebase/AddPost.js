import {firebase_db} from "./config";
import { collection, addDoc } from "firebase/firestore";

const db = firebase_db

export default async function AddPost(Post) {
    const currentDate = new Date();
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        weekday: 'short',
        day: 'numeric',
        month: 'long',
      };
    const formattedDate = currentDate.toLocaleString('en-US', options);
    Post.created = formattedDate
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