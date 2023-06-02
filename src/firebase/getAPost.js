import {firebase_db} from "./config";
import { doc, getDoc } from "firebase/firestore";

const db = firebase_db
export default async function getAPost(id) {
    let docRef = doc(db, 'Posts', id);

    let result = null;
    let error = null;

    try {
        result = await getDoc(docRef);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
