import { doc, deleteDoc } from "firebase/firestore";
import { firebase_db } from "./config";

const db = firebase_db
const DeleteAPost= async(postId)=>{
    let docRef = doc(db, 'posts', postId);

    let result = null;
    let error = null;

    try {
        result = await deleteDoc(docRef);
        console.log('result from deleting: ', result)
    } catch (e) {
        error = e;
        console.log('error from deleting post: ', error)
    }

    return { result, error };
    
}

export default DeleteAPost

